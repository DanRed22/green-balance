import { getAllUsers } from "../controller/users.controller.js";
import express from "express";
const usersRoute = express.Router();

usersRoute.get("/", getAllUsers);

export default usersRoute;
