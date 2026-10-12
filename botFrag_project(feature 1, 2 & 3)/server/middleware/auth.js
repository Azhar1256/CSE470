import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || 'dev-only-secret';

// Only tokens signed by this server are accepted. Unverified (e.g. Google) tokens are
// rejected: decoding them without checking the signature would let anyone forge a user.
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not signed in" });

  try {
    req.userId = jwt.verify(token, secret).id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Session expired or invalid, please sign in again" });
  }
};

export default auth;
