<?php
/**
 * SAWA United Group — contact handler configuration (example)
 * -----------------------------------------------------------------
 * Copy this file to `/domains/sawa-united.net/public_html/config.php`
 * on Hostinger and edit if needed.
 * `config.php` is blocked from direct HTTP access by `.htaccess`.
 *
 * Mailboxes to create in Hostinger hPanel → Emails:
 *   - noreply@sawa-united.net  (outgoing / sender)
 *   - info@sawa-united.net     (recipient / inbox)
 */
return [
    // Where enquiries are delivered
    'recipient' => 'info@sawa-united.net',

    // Authenticated sender created in hPanel (must exist on sawa-united.net to pass SPF/DKIM)
    'sender' => 'noreply@sawa-united.net',
    'sender_name' => 'SAWA United Group Website',

    // WhatsApp fallback number in international format, digits only
    'whatsapp' => '201011225592',

    // Minimum seconds between two submissions from the same IP
    'rate_limit_seconds' => 45,

    // Public site (used for reference in the mail body)
    'site_url' => 'https://sawa-united.net',

    // Optional blind copy for internal archiving (leave empty to disable)
    'bcc' => '',
];
