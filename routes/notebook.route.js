import { Router } from "express";
import {
  getAllNotebooks,
  getNotebookById,
  createNotebook,
  updateNotebook,
  deleteNotebook,
} from "../controller/notebook.controller.js";

const notebookRouter = Router();
notebookRouter.get("/:userId", getAllNotebooks);
notebookRouter.get("/:id", getNotebookById);
notebookRouter.post("/", createNotebook);
notebookRouter.put("/", updateNotebook);
notebookRouter.delete("/", deleteNotebook);

export default notebookRouter;
