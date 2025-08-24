const express = require('express');
const firebase = require('firebase-admin');
const shortid = require('shortid');
const path = require('path');
const app = express();

// تهيئة Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://your-project-id.firebaseio.com'
});
const db = firebase.database();

// إعداد Express
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// صفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// إنشاء رابط قصير
app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const shortCode = shortid.generate();

    try {
        await db.ref('links/' + shortCode).set({
            longUrl,
            createdAt: Date.now()
        });
        res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
    } catch (err) {
        res.status(500).json({ error: 'خطأ في الخادم' });
    }
});

// إعادة توجيه الرابط القصير
app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const snapshot = await db.ref('links/' + shortCode).once('value');
    const url = snapshot.val();
    if (url && url.longUrl) {
        return res.redirect(url.longUrl);
    } else {
        res.status(404).send('الرابط غير موجود');
    }
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
