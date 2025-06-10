// src/controllers/supplier.controller.ts
import { Request, Response } from "express";
import Supplier from "../models/supplier/Supplier";
import { sendResponse } from "../utils/response";

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const { name, description, email, address, phone } = req.body;

    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return sendResponse({
        res,
        status: 400,
        message: "El proveedor ya existe con este email",
        error: "Proveedor duplicado",
      });
    }

    const supplier = new Supplier({
      name,
      description,
      email,
      address,
      phone,
    });

    await supplier.save();
    sendResponse({ res, message: "Proveedor creado exitosamente", data: supplier });
  } catch (error) {
    sendResponse({ res, status: 500, message: "Error al crear proveedor", error: error });
  }
};

export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    sendResponse({ res, message: "Proveedores obtenidos exitosamente", data: suppliers });
  } catch (error) {
    sendResponse({ res, status: 500, message: "Error al obtener proveedores", error: error });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return sendResponse({ res, status: 404, message: "Proveedor no encontrado" });
    }
    sendResponse({ res, message: "Proveedor obtenido exitosamente", data: supplier });
  } catch (error) {
    sendResponse({ res, status: 500, message: "Error al obtener proveedor", error: error });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, ...updateData } = req.body;

    // Evitar actualización de email si se incluye
    if (email) {
      return sendResponse({
        res,
        status: 400,
        message: "No se puede actualizar el email del proveedor",
        error: "Actualización de email no permitida",
      });
    }

    const supplier = await Supplier.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!supplier) {
      return sendResponse({
        res,
        status: 404,
        message: "Proveedor no encontrado",
        error: "Proveedor no encontrado",
      });
    }

    sendResponse({ res, message: "Proveedor actualizado exitosamente", data: supplier });
  } catch (error) {
    sendResponse({ res, status: 500, message: "Error al actualizar proveedor", error: error });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return sendResponse({ res, status: 404, message: "Proveedor no encontrado" });
    }
    sendResponse({ res, message: "Proveedor eliminado exitosamente", data: supplier });
  } catch (error) {
    sendResponse({ res, status: 500, message: "Error al eliminar proveedor", error: error });
  }
};
