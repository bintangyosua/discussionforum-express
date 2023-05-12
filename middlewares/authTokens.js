const jwt = require('jsonwebtoken');


exports.authenticateToken = async (req, res, next) => {
    // Mengambil token dari header Authorization
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, 'sashiko');
        req.user = decoded; // Menyimpan data pengguna dalam objek req.user
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Invalid token' });
    }
}