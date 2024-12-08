import { Router } from "express";
import {
  getAllNotebooks,
  getNotebookById,
  createNotebook,
  updateNotebook,
  deleteNotebook,
  getNotebookEntriesById,
} from "../controller/notebook.controller.js";

const notebookRouter = Router();
notebookRouter.get("/:userId", getAllNotebooks);
notebookRouter.get("/notebook/:id", getNotebookById);
notebookRouter.get("/:id/entries", getNotebookEntriesById);
notebookRouter.post("/", createNotebook);
notebookRouter.put("/", updateNotebook);
notebookRouter.put("/delete", deleteNotebook);

export default notebookRouter;
