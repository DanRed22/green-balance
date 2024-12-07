import express from "express";
const router = express.Router();
import usersRoute from "./users.route.js";
import authRoute from "./auth.route.js";
import notebookRouter from "./notebook.route.js";
import entryRouter from "./entry.route.js";

router.use("/users", usersRoute);
router.use("/auth", authRoute);
router.use("/notebooks", notebookRouter);
router.use("/entries", entryRouter);
export default router;
