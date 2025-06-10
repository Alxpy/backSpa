import { Request, Response } from "express";
import { sendResponse } from "../utils/response";
import User from "../models/User/User";

export const getUsers = async (req: Request, res: Response) => {
  try {

    const users = await User.find().select("-password")

    sendResponse({
      res,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error fetching users",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return sendResponse({
        res,
        status: 400,
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return sendResponse({
        res,
        status: 404,
        message: "User not found",
      });
    }

    sendResponse({
      res,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error deleting user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}