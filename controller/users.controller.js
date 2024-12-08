import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, message: "Get all users", data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    res.json({ success: true, message: "Get user by id", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    res.json({ success: true, message: "Create user", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { username },
    });
    res.json({ success: true, message: "Update user", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
