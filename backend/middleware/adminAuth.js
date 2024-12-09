import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        // Decode and verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the email matches the admin email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        // If validation passes, proceed to the next middleware
        next();
    } catch (e) {
        res.json({ success: false, message: e.message });
    }
};

export default adminAuth;
