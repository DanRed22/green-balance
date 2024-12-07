import { compareSHA256Hash, generateSHA256Hash } from "../utils/hashUtil.js";

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key is required",
    });
  }

  console.log(apiKey, process.env.API_KEY_HASH);
  if (!compareSHA256Hash(apiKey, process.env.API_KEY_HASH)) {
    return res.status(401).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};

export default checkApiKey;
