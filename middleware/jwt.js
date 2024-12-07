import * as jose from "jose";
import moment from "moment";
import "moment-timezone"; // Updated import

/**
 * Signs a JWT token with the provided payload
 * @param {Object} payload - Data to be encoded in the token
 * @returns {Promise<string>} Signed JWT token
 */
export const signToken = async (payload) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(process.env.JWT_EXPIRES_IN)
    .sign(secret);
};

/**
 * Verifies and decodes a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Promise<Object|null>} Decoded token payload or null if invalid
 */
export const verifyToken = async (token) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token);
    return payload;
  } catch (error) {
    return null;
  }
};

/**
 * Checks if a JWT token has expired
 * @param {string} token - JWT token to check
 * @returns {Promise<boolean>} True if expired, false if valid
 */
export const isTokenExpired = async (token) => {
  const decoded = await verifyToken(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

export const generatePayload = (user) => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    exp: moment().add(process.env.JWT_EXPIRES_IN).tz("Asia/Manila").unix(),
    iat: moment().tz("Asia/Manila").unix(),
  };
};
