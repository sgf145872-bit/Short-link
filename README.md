# URL Shortener with Firebase
موقع بسيط لاختصار الروابط باستخدام Node.js، Express، وFirebase Realtime Database.

## التثبيت
1. قم بتثبيت Node.js.
2. استنسخ المستودع: `git clone <رابط المستودع>`
3. انتقل إلى المجلد: `cd url-shortener`
4. قم بتثبيت الحزم: `npm install`
5. أضف متغيرات بيئية:
   - `FIREBASE_SERVICE_ACCOUNT`: محتوى ملف JSON لتفويض Firebase.
   - `FIREBASE_DATABASE_URL`: رابط قاعدة البيانات من Firebase.
6. شغل الخادم: `npm start`

## النشر على Render
1. قم بإنشاء مستودع على GitHub.
2. ارفع المشروع إلى GitHub.
3. أنشئ حساب على Render وقم بربط المستودع.
4. أضف متغيرات بيئية في إعدادات Render:
   - `FIREBASE_SERVICE_ACCOUNT`: محتوى ملف JSON.
   - `FIREBASE_DATABASE_URL`: رابط قاعدة البيانات.
5. انشر التطبيق.

## الاستخدام
- أدخل رابطًا طويلًا في الصفحة الرئيسية.
- انقر على "اختصر الرابط" للحصول على رابط قصير.
- استخدم الرابط القصير لإعادة التوجيه إلى الرابط الأصلي.
