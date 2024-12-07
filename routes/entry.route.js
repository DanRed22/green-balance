import { Router } from "express";
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} from "../controller/entry.controller.js";

const entryRouter = Router();
entryRouter.get("/:userId", getAllEntries);
entryRouter.get("/:id", getEntryById);
entryRouter.post("/", createEntry);
entryRouter.put("/", updateEntry);
entryRouter.delete("/", deleteEntry);

export default entryRouter;
