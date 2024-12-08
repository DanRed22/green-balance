import { PrismaClient } from "@prisma/client";
import { getEntriesByDate, getEntriesByMonth } from "./entry.controller.js";
import moment from "moment";
const prisma = new PrismaClient();

export const getReports = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      error: true,
      data: {
        expenses: 0.0,
        gained: 0.0,
        month_expenses: 0.0,
      },
    });
  }

  try {
    const today = moment().format("YYYY-MM-DD");
    const entries = await getEntriesByDate(userId, today);
    console.log(entries);

    const gained = entries.reduce(
      (acc, entry) => acc + (entry.value >= 0 ? entry.value : 0),
      0,
    );
    const expenses = entries.reduce(
      (acc, entry) => acc + (entry.value < 0 ? entry.value : 0),
      0,
    );

    const month = moment().format("YYYY-MM");
    const monthEntries = await getEntriesByMonth(userId, month);

    const monthExpenses = monthEntries.reduce(
      (acc, entry) => acc + (entry.value < 0 ? entry.value : 0),
      0,
    );

    const monthGained = monthEntries.reduce(
      (acc, entry) => acc + (entry.value >= 0 ? entry.value : 0),
      0,
    );

    res.json({
      success: true,
      message: "Get reports",
      data: { expenses, gained, monthExpenses, monthGained },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
