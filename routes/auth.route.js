import express from "express";
import { verifyToken, signToken } from "../middleware/jwt.js";
import checkApiKey from "../middleware/checkApiKey.js";
import { hashToken } from "../controller/utility.controller.js";
import { loginUser } from "../controller/auth.controller.js";
const authRoute = express.Router();

authRoute.post("/verify", verifyToken);
authRoute.get("/generate-token", checkApiKey, signToken);
authRoute.post("/hash", hashToken);
authRoute.post("/login", checkApiKey, loginUser);

export default authRoute;
