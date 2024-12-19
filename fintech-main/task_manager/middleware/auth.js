import jwt from 'jsonwebtoken';
// After importing necessary modules, create an authenticateToken middleware function to req and to  get res.
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/dashboard');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '1ae0d70cada2ac6be8bb9972ed21abc7be1b2507605a048f7399ea26b8482123');
        req.userId = decoded.userId;
        
        console.log('Authenticated user ID:', req.userId);
        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.clearCookie('token');
        return res.redirect('/dashboard');
    }
}; 