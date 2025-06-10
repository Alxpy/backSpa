// src/controllers/pet.controller.ts
import { Request, Response } from "express";
import Pet from "../models/pet/Pet";
import { sendResponse } from "../utils/response";

export const createPet = async (req: Request, res: Response) => {
  try {
    const { name, species, breed, age, weight, note, image } = req.body;
    const owner = req.userId;

    const pet = new Pet({
      name,
      species,
      breed,
      age,
      weight,
      note,
      image,
      owner,
    });

    await pet.save();
    sendResponse({ res, message: "Mascota creada exitosamente", data: pet });
  } catch (error) {
    sendResponse({
      res,
      status: 400,
      message: "Error al crear mascota",
      error: error,
    });
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find({ owner: req.userId }).populate(
      "owner",
      "name email"
    );
    sendResponse({
      res,
      data: pets,
      message: "Mascotas obtenidas exitosamente",
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error al obtener mascotas",
      error,
    });
  }
};

export const getPetById = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findOne({
      _id: req.params.id,
      owner: req.userId,
    }).populate("owner", "name email");

    if (!pet) {
      return sendResponse({
        res,
        status: 404,
        message: "Mascota no encontrada",
      });
    }
    sendResponse({ res, data: pet, message: "Mascota obtenida exitosamente" });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error al obtener mascota",
      error,
    });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    delete updates.owner; // Previene cambio de dueño

    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!pet) {
      return sendResponse({
        res,
        status: 404,
        message: "Mascota no encontrada",
      });
    }
    sendResponse({
      res,
      data: pet,
      message: "Mascota actualizada exitosamente",
    });
  } catch (error) {
    sendResponse({
      res,
      status: 400,
      message: "Error al actualizar mascota",
      error,
    });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!pet) {
      return sendResponse({
        res,
        status: 404,
        message: "Mascota no encontrada",
      });
    }
    sendResponse({ res, message: "Mascota eliminada exitosamente" });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: "Error al eliminar mascota",
      error,
    });
  }
};
