import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const getAllNotebooks = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const notebooks = await prisma.notebook.findMany({
      where: { userId, deletedAt: null },
    });
    res.status(200).json({
      success: true,
      message: "Get all notebooks",
      data: notebooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNotebookById = async (req, res) => {
  try {
    const { id } = req.params;
    const notebook = await prisma.notebook.findUnique({ where: { id } });
    res.status(200).json({
      success: true,
      message: "Get notebook by id",
      data: notebook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNotebookEntriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const entries = await prisma.entry.findMany({
      where: { notebookId: id, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({
      success: true,
      message: "Get notebook entries by id",
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createNotebook = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const notebook = await prisma.notebook.create({
      data: { id: uuidv4(), title, description, value: 0.0, userId },
    });
    res.status(200).json({
      success: true,
      message: "Create notebook",
      data: notebook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateNotebook = async (req, res) => {
  try {
    const { id, userId, title, description } = req.body;
    const notebook = await prisma.notebook.update({
      where: { id, userId },
      data: { title, description },
    });
    res.status(200).json({
      success: true,
      message: "Update notebook",
      data: notebook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNotebook = async (req, res) => {
  try {
    const { id, userId } = req.body;
    const notebook = await prisma.notebook.update({
      where: { id, userId },
      data: { deletedAt: new Date() },
    });
    res.status(200).json({
      success: true,
      message: "Delete notebook",
      data: notebook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
