import crypto from "crypto";

/**
 * Generates a SHA-256 hash of the input string.
 *
 * @param {string} input - The input string to hash.
 * @return {string} The Base64-encoded hash.
 */
export const generateSHA256Hash = (input) => {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("base64");
};

export const compareSHA256Hash = (input, hash) => {
  return generateSHA256Hash(input) === hash;
};
