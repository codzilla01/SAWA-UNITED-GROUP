<?php
/**
 * ==========================================================================
 * SAWA United Group — contact form handler
 * ==========================================================================
 * Drop-in backend for the React contact form on https://sawaunited.net
 *
 * Requirements on Hostinger:
 *   - PHP 8.0+ (recommended: 8.2)
 *   - Two mailboxes: noreply@sawaunited.net (sender) + info@sawaunited.net (inbox)
 *   - Optional config.php copied from config.example.php
 *
 * Response contract (JSON):
 *   { "ok": true }                                   -> message accepted
 *   { "ok": false, "error": "...", "whatsapp": url } -> client shows WhatsApp fallback
 * ==========================================================================
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('Cache-Control: no-store, max-age=0');

$configFile = __DIR__ . '/config.php';
$config = is_file($configFile) ? require $configFile : [];
if (!is_array($config)) {
    $config = [];
}

$recipient  = (string) ($config['recipient'] ?? 'info@sawaunited.net');
$sender     = (string) ($config['sender'] ?? 'noreply@sawaunited.net');
$senderName = (string) ($config['sender_name'] ?? 'SAWA United Group Website');
$waNumber   = preg_replace('/\D+/', '', (string) ($config['whatsapp'] ?? '201011225592')) ?? '201011225592';
$rateWindow = max(10, (int) ($config['rate_limit_seconds'] ?? 45));
$siteUrl    = (string) ($config['site_url'] ?? 'https://sawaunited.net');
$bcc        = (string) ($config['bcc'] ?? '');

/** Send a JSON response and stop. */
function sawa_respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Sanitise a single-line or multi-line text value. */
function sawa_clean(mixed $value, int $maxLength = 500): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = strip_tags($value);
    $value = str_replace(["\0", "\r"], '', $value);
    $value = trim($value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }
    return substr($value, 0, $maxLength);
}

/** Build the WhatsApp fallback URL containing the full enquiry. */
function sawa_whatsapp(string $number, string $intro, array $fields): string
{
    $lines = [$intro];
    foreach ($fields as $label => $value) {
        if ($value !== '') {
            $lines[] = $label . ': ' . $value;
        }
    }
    return 'https://wa.me/' . $number . '?text=' . rawurlencode(implode("\n", $lines));
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Allow: POST');
    sawa_respond(405, [
        'ok' => false,
        'error' => 'method_not_allowed',
    ]);
}

// --------------------------------------------------------------------------
// Read the payload (JSON from fetch, or classic form encoding)
// --------------------------------------------------------------------------
$raw  = file_get_contents('php://input');
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$requestedLocale = is_string($data['locale'] ?? null) ? $data['locale'] : 'ar';
$locale = in_array($requestedLocale, ['ar', 'en', 'fr'], true) ? $requestedLocale : 'ar';
$name    = sawa_clean($data['name'] ?? '', 120);
$email   = sawa_clean($data['email'] ?? '', 180);
$phone   = sawa_clean($data['phone'] ?? '', 40);
$sector  = sawa_clean($data['sector'] ?? '', 80);
$message = sawa_clean($data['message'] ?? '', 4000);
$consentRaw = $data['consent'] ?? false;
$consent = $consentRaw === true || $consentRaw === 'true' || $consentRaw === '1';

$intro = [
    'ar' => 'استفسار جديد عبر موقع مجموعة سوا المتحدة',
    'en' => 'New enquiry via the SAWA United Group website',
    'fr' => 'Nouvelle demande via le site SAWA United Group',
][$locale];

$labels = [
    'ar' => ['name' => 'الاسم', 'email' => 'البريد', 'phone' => 'الجوال', 'sector' => 'القطاع', 'message' => 'الرسالة'],
    'en' => ['name' => 'Name', 'email' => 'Email', 'phone' => 'Phone', 'sector' => 'Sector', 'message' => 'Message'],
    'fr' => ['name' => 'Nom', 'email' => 'E-mail', 'phone' => 'Téléphone', 'sector' => 'Secteur', 'message' => 'Message'],
][$locale];

$whatsapp = sawa_whatsapp($waNumber, $intro, [
    $labels['name'] => $name,
    $labels['email'] => $email,
    $labels['phone'] => $phone,
    $labels['sector'] => $sector,
    $labels['message'] => $message,
]);

// --------------------------------------------------------------------------
// Spam protection
// --------------------------------------------------------------------------
// 1. Honeypot: bots fill hidden fields. Pretend success, send nothing.
$honeypot = sawa_clean($data['company_website'] ?? '', 200);
if ($honeypot !== '') {
    sawa_respond(200, ['ok' => true]);
}

// 2. Rate limiting per IP (45 seconds by default)
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0') . '|sawa');
$rateDir = sys_get_temp_dir() . '/sawa-contact-rate';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0700, true);
}
$rateFile = $rateDir . '/' . $ipHash . '.txt';
if (is_file($rateFile) && (time() - (int) filemtime($rateFile)) < $rateWindow) {
    sawa_respond(429, [
        'ok' => false,
        'error' => 'rate_limited',
        'whatsapp' => $whatsapp,
    ]);
}
@touch($rateFile);

// 3. Link-flood heuristic
if (preg_match_all('#https?://#i', $message) > 4) {
    sawa_respond(422, [
        'ok' => false,
        'error' => 'spam_suspected',
        'whatsapp' => $whatsapp,
    ]);
}

// --------------------------------------------------------------------------
// Validation
// --------------------------------------------------------------------------
$valid = function_exists('mb_strlen')
    ? mb_strlen($name, 'UTF-8') >= 2 && mb_strlen($message, 'UTF-8') >= 20
    : strlen($name) >= 2 && strlen($message) >= 20;

if (!$valid || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$consent) {
    sawa_respond(422, [
        'ok' => false,
        'error' => 'validation_failed',
        'whatsapp' => $whatsapp,
    ]);
}

// --------------------------------------------------------------------------
// Compose the email
// --------------------------------------------------------------------------
$safeName   = str_replace(["\r", "\n", '%0d', '%0a'], ' ', $name);
$safeEmail  = str_replace(["\r", "\n"], '', $email);
$safePhone  = str_replace(["\r", "\n"], ' ', $phone);
$safeSector = str_replace(["\r", "\n"], ' ', $sector);

$subject = '=?UTF-8?B?' . base64_encode($intro . ' — ' . $safeName) . '?=';

$bodyLines = [
    'SAWA UNITED GROUP — Web enquiry',
    '----------------------------------------',
    'Language:  ' . strtoupper($locale),
    'Name:      ' . $safeName,
    'Email:     ' . $safeEmail,
    'Phone:     ' . ($safePhone !== '' ? $safePhone : '—'),
    'Sector:    ' . ($safeSector !== '' ? $safeSector : 'General enquiry'),
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    'Page:      ' . sawa_clean($data['page'] ?? $siteUrl, 300),
    'IP:        ' . sawa_clean($_SERVER['REMOTE_ADDR'] ?? '', 45),
    '----------------------------------------',
    'Message:',
    $message,
    '----------------------------------------',
    'Consent to privacy policy: yes',
    'Reply directly to this email to answer the client.',
];
$body = implode("\n", $bodyLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . '=?UTF-8?B?' . base64_encode($senderName) . '?=' . ' <' . $sender . '>',
    'Reply-To: ' . '=?UTF-8?B?' . base64_encode($safeName) . '?=' . ' <' . $safeEmail . '>',
    'X-Mailer: SAWA Website',
];
if ($bcc !== '') {
    $headers[] = 'Bcc: ' . $bcc;
}

$sent = false;
if (function_exists('mail')) {
    // -f sets the envelope sender so SPF/DKIM pass on Hostinger.
    $sent = @mail($recipient, $subject, $body, implode("\r\n", $headers), '-f' . $sender);
}

if (!$sent) {
    sawa_respond(503, [
        'ok' => false,
        'error' => 'mail_failed',
        'whatsapp' => $whatsapp,
        'message' => 'The mail server did not accept the message. Use the WhatsApp fallback.',
    ]);
}

sawa_respond(200, [
    'ok' => true,
    'whatsapp' => $whatsapp,
]);
