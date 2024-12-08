import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();
import moment from "moment";
import "moment-timezone";

export const getAllEntries = async (req, res) => {
  const { userId } = req.params;
  const entries = await prisma.entry.findMany({
    where: { userId, deletedAt: null },
  });
  res.json({ success: true, message: "Get all entries", data: entries });
};

export const getEntriesByDate = async (userId, date) => {
  const startOfDay = moment(date, "YYYY-MM-DD").startOf("day").toISOString();

  const endOfDay = moment(date, "YYYY-MM-DD").endOf("day").toISOString();

  const entries = await prisma.entry.findMany({
    where: {
      userId,
      deletedAt: null,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
  return entries;
};

export const getEntriesByMonth = async (userId, month) => {
  const startOfMonth = moment(month, "YYYY-MM").startOf("month").toISOString();
  const endOfMonth = moment(month, "YYYY-MM").endOf("month").toISOString();

  const entries = await prisma.entry.findMany({
    where: {
      userId,
      deletedAt: null,
      createdAt: { gte: startOfMonth, lte: endOfMonth },
    },
  });
  return entries;
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
  console.log("AM HERE");
  console.log(req.body);
  try {
    const { id, userId } = req.body;
    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing id or userId",
      });
    }
    const entry = await prisma.entry.update({
      where: { id, userId },
      data: { deletedAt: moment().tz("Asia/Manila").toISOString() },
    });
    res.json({ success: true, message: "Deleted entry", data: entry });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
