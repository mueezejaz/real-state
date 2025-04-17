import jwt from 'jsonwebtoken';
import envconfig from 'dotenv'
envconfig.config()
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
