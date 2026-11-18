# SAWA United Group — دليل الرفع على Hostinger (`sawa-united.net`)

المسار المستهدف على الاستضافة:
`/domains/sawa-united.net/public_html`

---

## 1. إنشاء حزمة الرفع الجاهزة

```bash
npm ci
npm run build:hostinger
```

يقوم الأمر ببناء النسخة الإنتاجية الكاملة داخل `dist/` والتحقق من جميع الملفات المطلوبة، ثم إنشاء ملف مضغوط مسطّح جاهز للرفع مباشرة:
**`sawa-united-public_html.zip`**

> كما يقوم GitHub Actions (`.github/workflows/hostinger-package.yml`) تلقائيًا عند كل دمج على `main` بتوليد ملف `sawa-united-public_html.zip` جاهز للتحميل من تبويب **Actions**.

### محتويات الحزمة (توضع مباشرة داخل `public_html`)

| File | Purpose |
| --- | --- |
| `index.html` + `assets/` | نسخة جاهزة مباشرةً للمتصفح (`index.html` + `assets/app.js` + `assets/style.css` + `logo.png` + `logo-mark.png`) تعمل فورًا دون أي بناء |
| `.htaccess` | تحويل HTTPS + توحيد `www` إلى `sawa-united.net` + التوجيه + الكاش + الضغط + حماية `config.php` |
| `contact.php` | معالج نموذج التواصل (PHP 8.0+ / مستحسن PHP 8.2) مع بديل واتساب تلقائي |
| `config.example.php` | قالب إعدادات البريد (انسخه إلى `config.php` داخل `public_html` عند الحاجة) |
| `projects.html`, `privacy.html` | نقاط دخول احتياطية متوافقة مع SEO (تُوجّه عبر `.htaccess` إلى `index.html`) |
| `404.html` | صفحة خطأ 404 مخصصة (`ErrorDocument`) |
| `robots.txt`, `sitemap.xml` | ملفات الأرشفة مضبوطة على `https://sawa-united.net` |
| `favicon-192.png`, `site.webmanifest`, `og-cover.jpg` | شعار وأيقونة الموقع الرسمية وصورة المشاركة الاجتماعية (Open Graph) |

---

## 2. خطوات الرفع على Hostinger File Manager

1. افتح مدير الملفات في hPanel على المسار:
   `/domains/sawa-united.net/public_html`
2. إذا كان هناك ملف افتراضي من الاستضافة مثل `default.php` احذفه (واحتفظ بملف `config.php` إن كنت أنشأته سابقًا).
3. ارفع ملف **`sawa-united-public_html.zip`** داخل `public_html`.
4. انقر بزر الفأرة الأيمن على `sawa-united-public_html.zip` → **Extract** → اكتب في اسم المجلد `.` (نقطة واحدة) ليتم فك الملفات مباشرة داخل `public_html` وليس داخل مجلد فرعي.
5. احذف ملف `sawa-united-public_html.zip` من `public_html` بعد انتهاء فك الضغط.
6. تأكد من وجود `.htaccess` داخل `public_html` (فعّل إظهار الملفات المخفية من Settings إن لزم) وأن الصلاحيات: مجلدات `755` وملفات `644`.
7. من **hPanel → Advanced → PHP Configuration** اختر **PHP 8.2** (أو أحدث)، وتأكد من تفعيل شهادة **SSL** المجانية للنطاق `sawa-united.net`.

---

## 2-ب. الرفع التلقائي من GitHub إلى Hostinger (FTP عبر GitHub Actions)

يقوم ملف `.github/workflows/hostinger-package.yml` تلقائيًا ببناء المشروع ورفع محتويات `dist/` مباشرةً إلى `public_html` على Hostinger عند كل دمج في `main` (أو تشغيل يدوي من تبويب **Actions**)، بمجرد إضافة 3 أسرار مرة واحدة في إعدادات المستودع (`Settings → Secrets and variables → Actions → New repository secret`):

| Secret Name | من أين تحصل عليه في Hostinger hPanel → Files → FTP Accounts |
| --- | --- |
| `HOSTINGER_FTP_SERVER` | عنوان **FTP IP** أو **FTP Host** (بدون `ftp://`، مثل `185.x.x.x` أو `ftp.sawa-united.net`) |
| `HOSTINGER_FTP_USERNAME` | اسم مستخدم **FTP Username** |
| `HOSTINGER_FTP_PASSWORD` | كلمة مرور حساب FTP |
| `HOSTINGER_FTP_SERVER_DIR` | *(اختياري)* اتركه فارغًا إذا كان مسار حساب FTP يشير مباشرةً إلى `public_html`، أو ضع `./public_html/` أو `./domains/sawa-united.net/public_html/` (يجب أن ينتهي بـ `/`) حسب نوع حساب FTP |

يحافظ الرفع التلقائي على ملف `config.php` الحي ومجلد `.well-known/` لشهادة SSL دون المساس بهما.

---

## 3. إعداد البريد الإلكتروني لنموذج التواصل (hPanel → Emails)

أنشئ صندوقين على النطاق `sawa-united.net`:

| Mailbox | Role |
| --- | --- |
| `noreply@sawa-united.net` | المرسل التلقائي (`From`) — لاجتياز فحوصات SPF / DKIM |
| `info@sawa-united.net` | صندوق استقبال رسائل العملاء (`To`) |

يعمل `contact.php` تلقائيًا بهذه القيم الافتراضية دون أي تعديل. وإذا أردت تخصيص بريد الاستقبال أو إضافة نسخة مخفية `bcc`:
1. داخل `/domains/sawa-united.net/public_html` انسخ `config.example.php` باسم `config.php`.
2. عدّل القيم المطلوبة (`recipient`, `sender`, `whatsapp`, `bcc`).
3. ملف `config.php` محجوب بالكامل عن الزوار عبر `.htaccess` ولا يُقرأ إلا من PHP.

*(في حال تأخر خادم البريد أو عدم إعداد الصناديق بعد، يعرض الموقع تلقائيًا خيار الإرسال الفوري لنفس الرسالة عبر واتساب `+20 10 1122 5592` أو البريد الإلكتروني دون فقدان البيانات.)*

---

## 4. قائمة التحقق بعد الرفع

| الرابط / الاختبار | النتيجة المتوقعة |
| --- | --- |
| `http://sawa-united.net` | تحويل `301` إلى `https://sawa-united.net` |
| `https://www.sawa-united.net` | تحويل `301` إلى `https://sawa-united.net` |
| `https://sawa-united.net/` | فتح الصفحة الرئيسية بكامل اللغات (`ع / EN / FR`) والوضعين الليلي/النهاري |
| `https://sawa-united.net/projects.html` أو `/projects` | فتح صفحة المشروعات مباشرة |
| `https://sawa-united.net/privacy.html` أو `/privacy` | فتح صفحة سياسة الخصوصية مباشرة |
| `https://sawa-united.net/config.example.php` | محجوب (`403` / صفحة الخطأ المخصصة) |
| `https://sawa-united.net/non-existent-page` | ظهور صفحة `404` المخصصة |
| `https://sawa-united.net/sitemap.xml` و `/robots.txt` | يعملان بروابط `https://sawa-united.net` |
| نموذج التواصل + واتساب | إرسال البريد إلى `info@sawa-united.net` أو التحويل لواتساب `201011225592` |

---

بيانات التواصل المعتمدة في هذه النسخة:
- النطاق: `https://sawa-united.net`
- البريد الإلكتروني: `info@sawa-united.net`
- الهاتف والواتساب: `+20 10 1122 5592` (`01011225592`)
- المقر الرئيسي: مدينة الشيخ زايد، مدينة 6 أكتوبر، مصر (`El Sheikh Zayed City, 6 October City, Egypt`)
