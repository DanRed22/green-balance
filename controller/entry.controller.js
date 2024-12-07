import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllEntries = async (req, res) => {
  const { userId } = req.params;
  const entries = await prisma.entry.findMany({
    where: { userId, deletedAt: null },
  });
  res.json({ success: true, message: "Get all entries", data: entries });
};

export const getEntryById = async (req, res) => {
  const { id } = req.params;
  const entry = await prisma.entry.findUnique({ where: { id } });
  res.json({ success: true, message: "Get entry by id", data: entry });
};

export const getEntriesByNotebookId = async (req, res) => {
  const { notebookId } = req.params;
  const entries = await prisma.entry.findMany({
    where: { notebookId, deletedAt: null },
  });
  res.json({
    success: true,
    message: "Get entries by notebook id",
    data: entries,
  });
};

export const createEntry = async (req, res) => {
  const { userId, notebookId, title, value, description } = req.body;
  const entry = await prisma.entry.create({
    data: { userId, notebookId, title, value, description },
  });
  res.json({ success: true, message: "Created entry", data: entry });
};

export const updateEntry = async (req, res) => {
  const { id, userId, notebookId, title, value, description } = req.body;
  const entry = await prisma.entry.update({
    where: { id, userId },
    data: { title, value, description, updatedAt: new Date() },
  });
  res.json({ success: true, message: "Updated entry", data: entry });
};

export const deleteEntry = async (req, res) => {
  const { id, userId } = req.body;
  const entry = await prisma.entry.update({
    where: { id, userId },
    data: { deletedAt: new Date() },
  });
  res.json({ success: true, message: "Deleted entry", data: entry });
};
