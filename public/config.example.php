<?php
/**
 * SAWA United Group — contact handler configuration (example)
 * -----------------------------------------------------------------
 * Copy this file to `config.php` on the Hostinger server and edit it.
 * `config.php` is blocked from direct HTTP access by .htaccess.
 *
 * Mailboxes to create in Hostinger hPanel → Emails:
 *   - noreply@sawaunited.net  (outgoing / sender)
 *   - info@sawaunited.net     (recipient / inbox)
 */
return [
    // Where enquiries are delivered
    'recipient' => 'info@sawaunited.net',

    // Authenticated sender created in hPanel (must exist to pass SPF/DKIM)
    'sender' => 'noreply@sawaunited.net',
    'sender_name' => 'SAWA United Group Website',

    // WhatsApp fallback number in international format, digits only
    'whatsapp' => '201011225592',

    // Minimum seconds between two submissions from the same IP
    'rate_limit_seconds' => 45,

    // Public site (used for reference in the mail body)
    'site_url' => 'https://sawaunited.net',

    // Optional blind copy for internal archiving (leave empty to disable)
    'bcc' => '',
];
