import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const getAllNotebooks = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const notebooks = await prisma.notebook.findMany({ where: { userId } });
  res.json({ success: true, message: "Get all notebooks", data: notebooks });
};

export const getNotebookById = async (req, res) => {
  const { id } = req.params;
  const notebook = await prisma.notebook.findUnique({ where: { id } });
  res.json({ success: true, message: "Get notebook by id", data: notebook });
};

export const createNotebook = async (req, res) => {
  const { userId, title, description } = req.body;
  const notebook = await prisma.notebook.create({
    data: { id: uuidv4(), title, description, value: 0.0, userId },
  });
  res.json({ success: true, message: "Create notebook", data: notebook });
};

export const updateNotebook = async (req, res) => {
  const { id, userId, title, description } = req.body;
  const notebook = await prisma.notebook.update({
    where: { id, userId },
    data: { title, description },
  });
  res.json({ success: true, message: "Update notebook", data: notebook });
};

export const deleteNotebook = async (req, res) => {
  const { id, userId } = req.body;
  const notebook = await prisma.notebook.update({
    where: { id, userId },
    data: { deletedAt: new Date() },
  });
  res.json({ success: true, message: "Delete notebook", data: notebook });
};
