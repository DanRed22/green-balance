import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import { hashToken } from "./utility.controller.js";
import { signToken } from "../middleware/jwt.js";
import { generatePayload } from "../middleware/jwt.js";

const prisma = new PrismaClient();

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.token = null;
    user.tokenExp = null;
    const payload = generatePayload(user);
    const token = await signToken(payload);

    return res.status(200).json({
      success: true,
      data: {
        token,
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
