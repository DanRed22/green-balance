import express from "express";
const router = express.Router();
import usersRoute from "./users.route.js";

router.use("/users", usersRoute);

export default router;
