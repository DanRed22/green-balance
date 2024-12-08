import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controller/users.controller.js";
import express from "express";
import checkApiKey from "../middleware/checkApiKey.js";
const usersRoute = express.Router();

usersRoute.get("/", checkApiKey, getAllUsers);
usersRoute.get("/:id", checkApiKey, getUserById);
usersRoute.post("/", checkApiKey, createUser);
usersRoute.put("/:id", checkApiKey, updateUser);
export default usersRoute;
