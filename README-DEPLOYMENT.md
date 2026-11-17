# SAWA United Group — Deployment & Operations Guide

منصة مجموعة سوا المتحدة: واجهة React/Vite متعددة اللغات (AR/EN/FR)، وضعان ليلي/نهاري، SEO، صفحة مشروعات بتصفية فورية، سياسة خصوصية، معالج بريد PHP مع بديل واتساب.

---

## 1. Local build

```bash
npm install
npm run build
```

الإخراج في `dist/` ويتضمن:

| File | Purpose |
| --- | --- |
| `index.html` | SPA كاملة (JS/CSS مضمّنة) |
| `projects.html`, `privacy.html` | نقاط دخول مباشرة (على Hostinger تُحوّل إلى `index.html` عبر `.htaccess`) |
| `404.html` | صفحة الخطأ المخصصة (ErrorDocument) |
| `contact.php` | معالج نموذج التواصل |
| `config.example.php` | إعدادات البريد (انسخه إلى `config.php`) |
| `.htaccess` | HTTPS + توحيد النطاق + ضغط + كاش + حماية |
| `robots.txt`, `sitemap.xml` | الأرشفة |
| `favicon.svg`, `site.webmanifest`, `og-cover.jpg` | الهوية والمشاركة الاجتماعية |

## 2. Upload to Hostinger (`public_html`)

1. اضغط `dist/` محليًا ثم ارفع **محتوياته** إلى `public_html` (وليست مجلد `dist` نفسه).
2. فعّل «إظهار الملفات المخفية» في File Manager لتأكيد رفع `.htaccess`.
3. تأكد من أن الصلاحيات: مجلدات `755` وملفات `644`. لا تجعل أي ملف `777`.
4. من hPanel → Advanced → PHP Configuration: اختر **PHP 8.2**.
5. Root domain: `sawaunited.net`، وفعّل شهادة SSL المجانية (Let's Encrypt).
6. اختبر: `https://sawaunited.net/` و`https://sawaunited.net/projects.html` و`https://sawaunited.net/privacy.html` وصفحة غير موجودة مثل `/test-404`.

> ملاحظة: على خادم Apache/LiteSpeed تُخدم صفحات المشروعات والخصوصية عبر `index.html` مع المسار الصحيح حتى تعمل روابط SEO دون فقدان التصميم. وملفات `projects.html`/`privacy.html` المرفوعة هي نقاط احتياطية في أي بيئة ثابتة.

## 3. Mailboxes (hPanel → Emails)

أنشئ صندوقين على النطاق:

| Mailbox | Role |
| --- | --- |
| `noreply@sawaunited.net` | المرسل التلقائي (From) — يجب إنشاؤه لاجتياز SPF/DKIM |
| `info@sawaunited.net` | مستقبل رسائل العملاء (To) |

اضبط سجلات النطاق تلقائيًا من hPanel (SPF + DKIM + DMARC). يمكن إضافة DKIM من Email → DNS.

### Config

```bash
cp public/config.example.php public/config.php
```

ثم عدّل:

- `recipient` → `info@sawaunited.net`
- `sender` → `noreply@sawaunited.net`
- `whatsapp` → رقم واتساب الأعمال بالصيغة الدولية بدون `+` (مثال: `201011225592`)

`config.php` محمي من الوصول المباشر عبر `.htaccess`، ويُقرأ من PHP فقط. إن لم يوجد، يستخدم `contact.php` القيم الافتراضية.

## 4. Contact form behaviour

1. تحقق عميل من الاسم/البريد/الرسالة/الموافقة.
2. Honeypot مخفي + مهلة IP (45 ثانية) + فلتر روابط على الخادم.
3. إرسال `POST` بصيغة JSON إلى `/contact.php`.
4. عند نجاح `mail()` → حالة نجاح.
5. عند فشل الخادم/انقطاع الشبكة → تظهر تلقائيًا حالة بديلة مع:
   - زر واتساب يضم نفس نص الرسالة كاملًا.
   - زر بريد إلكتروني (`mailto:`) بنفس المحتوى.
   - إعادة المحاولة دون فقدان المدخلات.

في بيئة المعاينة (بدون PHP) سيعمل البديل تلقائيًا — هذا سلوك مقصود.

## 5. Multilingual & theme verification

- أزرار اللغة: `ع / EN / FR`. يتم تغيير `html lang` و`dir` وحفظ التفضيل في `localStorage` (`sawa-locale`).
- تفضيل الوضع: `sawa-theme` في `localStorage`، ويُطبّق على `<html class="dark">` قبل الرسم الأول (inline bootstrap في `index.html`) لمنع الوميض.
- جميع النصوص والبطاقات والمشروعات والأسواق والسياسة مترجمة. سياسة الخصوصية متاحة بالعربية والإنجليزية حسب المتطلب.

## 6. SEO

- عناوين وأوصاف ديناميكية لكل صفحة ولغة (`useSeo`).
- Open Graph + Twitter Card + Canonical + Hreflang.
- JSON-LD `Organization` مع القطاعات والعناوين واللغات.
- `robots.txt` + `sitemap.xml` + manifest + favicon.
- الصفحة 404 تحمل `noindex`.

## 7. Security checklist

- HTTPS إجباري + توحيد النطاق من `.htaccess`.
- `Options -Indexes`، حجب `config.php` و`.env` والسجلات والنسخ الاحتياطية.
- رؤوس `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`.
- PHP: تعقيم المدخلات، منع حقن الرؤوس، `Reply-To` بعد التحقق، `-f` للمرسل.
- لا تضع أي مفاتيح API داخل ملفات الواجهة.

## 8. Test matrix

| Test | Expected |
| --- | --- |
| `http://sawaunited.net` | تحويل 301 إلى `https://sawaunited.net` |
| `https://www.sawaunited.net` | تحويل 301 إلى النطاق الأساسي |
| تبديل اللغة | نص واتجاه RTL/LTR فوري + حفظ بعد التحديث |
| تبديل الوضع | ليلي/نهاري فوري + حفظ بعد التحديث |
| تصفية المشروعات | فوري حسب القطاع + عدّاد النتائج |
| نموذج التواصل | بريد يصل إلى info@، أو بديل واتساب عند الفشل |
| `/random` | صفحة 404 المخصصة |
| بحث Google | sitemap وrobots سليمان |

## 9. Maintenance

- لتحديث مشروع/ترجمة: `src/data/content.ts` و`src/lib/i18n.tsx` ثم إعادة البناء والرفع.
- رقم الواتساب والبريد: `src/lib/site.ts` و`public/config.php` (والاثنان يجب أن يتطابقا).
- احتفظ بنسخة احتياطية من `public_html` و`public_html/config.php` قبل كل نشر.

---

Project contact details in this build: `info@sawaunited.net` · `+20 10 1122 5592` (`01011225592`).
