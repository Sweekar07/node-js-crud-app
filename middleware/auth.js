import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Use the same secret key

export function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}
