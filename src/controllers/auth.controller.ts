// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import User from "../models/User/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response";
import { JWT_SECRET } from "../config";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse({
        res,
        status: 400,
        message: "El email ya está registrado",
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: "user", // Por defecto
    });

    await user.save();
    sendResponse({
      res,
      status: 201,
      message: "Usuario registrado exitosamente",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error al registrar el usuario",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse({
        res,
        status: 404,
        message: "Usuario no encontrado",
      });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse({
        res,
        status: 400,
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "8h",
    });

    sendResponse({
      res,
      message: "Login exitoso",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
      },
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error al iniciar sesión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener perfil de usuario (protegido)
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return sendResponse({
        res,
        status: 404,
        message: "Usuario no encontrado",
      });
    }
    sendResponse({
      res,
      message: "Perfil obtenido exitosamente",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error al obtener el perfil",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
