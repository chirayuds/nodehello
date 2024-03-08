import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Set up Global configuration access 
dotenv.config(); 

const secretKey = process.env.JWT_SECRET_KEY; // Replace with your actual secret key

let revokedTokens = [];

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '12h' }); // Token expires in 1 hour
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']; // Assuming token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is not provided' });
  }

  // Check if the token is revoked (blacklisted)
  if (revokedTokens.includes(token)) {
    return res.status(401).json({ message: 'Unauthorized: Token revoked (logged out)' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }
    req.user = decoded.user; // Assuming 'user' is in the payload
    next();
  });
}

function addToRevokedTokens(token) {
  return new Promise((resolve, reject) => {
    revokedTokens.push(token);
    resolve();
  });
}

export  {
  generateToken,
  verifyToken,
  authenticateToken,
  addToRevokedTokens
};
