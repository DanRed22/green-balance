import express from "express";
import { getReports } from "../controller/dashboard.controller.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/reports/:userId", getReports);

export default dashboardRoute;
