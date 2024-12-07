import {
  getAllUsers,
  getUserById,
  createUser,
} from "../controller/users.controller.js";
import express from "express";
import checkApiKey from "../middleware/checkApiKey.js";
const usersRoute = express.Router();

usersRoute.get("/", checkApiKey, getAllUsers);
usersRoute.get("/:id", checkApiKey, getUserById);
usersRoute.post("/", checkApiKey, createUser);

export default usersRoute;
