import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {

    const headerAuth = req.headers.authorization;
    if (!headerAuth) {
      return sendResponse({
        res,
        status: 401,
        message: "No se proporcionó el token de autenticación",
      });
    }

    const token = headerAuth.split(" ")[1];

    if (!token) {
      return sendResponse({
        res,
        status: 401,
        message: "Token de autenticación no válido",
      });
    }


    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded || !decoded.id) {
      return sendResponse({
        res,
        status: 401,
        message: "Token de autenticación no válido",
      });
    }
    
    // Agregar el userId al objeto de solicitud para su uso posterior
    req.userId = decoded.id;
    next();

  } catch (error) {
    sendResponse({
      res,
      message: "Error de autenticación",
      error,
      status: 401,
    });
  }
};
