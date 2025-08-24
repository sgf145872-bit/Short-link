const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const path = require('path');
const app = express();

// الاتصال بـ MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/url-shortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// نموذج قاعدة البيانات
const UrlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});
const Url = mongoose.model('Url', UrlSchema);

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
        const url = new Url({ longUrl, shortCode });
        await url.save();
        res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
    } catch (err) {
        res.status(500).json({ error: 'خطأ في الخادم' });
    }
});

// إعادة توجيه الرابط القصير
app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (url) {
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
