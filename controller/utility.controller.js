import { generateSHA256Hash } from "../utils/hashUtil.js";

export const hashToken = async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Key is required in request body",
      });
    }

    const hash = generateSHA256Hash(key);

    res.json({
      success: true,
      message: "Hash generated successfully",
      data: hash,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
