import { Request, Response } from "express";
import Pet from "../models/pet/Pet";
import { sendResponse } from "../utils/response";
import Service from "../models/Service/Service";
import Appointment from "../models/appointment/Appointment";
import User from "../models/User/User";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { date, time, pet, service, notes } = req.body;
    const userId = req.userId;
    console.log(req.body);

    // Verificar que las mascotas pertenezcan al usuario
    const userPets = await Pet.find({ _id: { $in: pet }, owner: userId });
    if (userPets.length !== pet.length) {
      return sendResponse({
        res,
        status: 403,
        message: "Unauthorized pet access",
        error: "User does not own all specified pets",
      });
    }

    // Verificar que el servicio existe
    const serviceExists = await Service.findById(service);
    if (!serviceExists) {
      return sendResponse({
        res,
        status: 404,
        message: "Service not found",
      });
    }

    const appointment = new Appointment({
      date,
      time,
      pet,
      service,
      notes,
      status: "scheduled",
    });

    await appointment.save();

    const populatedAppointment = await appointment.populate(["pet", "service"]);
    return sendResponse({
      res,
      message: "Appointment created successfully",
      data: populatedAppointment,
    });
  } catch (error) {
    return sendResponse({
      res,
      status: 400,
      message: "Error creating appointment",
      error,
    });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const userPets = await Pet.find({ owner: userId }, "_id");
    const petIds = userPets.map((pet) => pet._id);

    const user = await User.findById(userId);

    if (!user) {
      return sendResponse({
        res,
        status: 404,
        message: "User not found",
      });
    }

    const appointments = await Appointment.find({
      pet: { $in: petIds },
    })
      .populate(["pet", "service"])
      .lean();

    const datos = appointments.map((appointment) => {
      return {
        ...appointment,
        owner: user,
      };
    });

    sendResponse({
      res,
      message: "Appointments retrieved successfully",
      data: datos,
    });
  } catch (error) {
    return sendResponse({
      res,
      status: 500,
      message: "Error fetching appointments",
      error,
    });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const appointment = await Appointment.findById(req.params.id).populate([
      "pet",
      "service",
    ]);

    if (!appointment) {
      return sendResponse({
        res,
        status: 404,
        message: "Appointment not found",
      });
    }

    const userOwnsPet = await Pet.findOne({
      _id: { $in: appointment.pet },
      owner: userId,
    });

    if (!userOwnsPet) {
      return sendResponse({
        res,
        status: 403,
        message: "Unauthorized access to appointment",
      });
    }

    return sendResponse({
      res,
      message: "Appointment retrieved successfully",
      data: appointment,
    });
  } catch (error) {
    return sendResponse({
      res,
      status: 500,
      message: "Error fetching appointment",
      error,
    });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const updates = req.body;

    const appointment = await Appointment.findById(id).populate({
      path: "pet",
      match: { owner: userId },
    });

    if (!appointment || appointment.pet.length === 0) {
      return sendResponse({
        res,
        status: 404,
        message: "Appointment not found or unauthorized",
      });
    }

    if (appointment.status !== "scheduled" && updates.service) {
      return sendResponse({
        res,
        status: 400,
        message: "Cannot change service for completed/canceled appointments",
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate(["pet", "service"]);

    return sendResponse({
      res,
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    return sendResponse({
      res,
      status: 400,
      message: "Error updating appointment",
      error,
    });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const appointment = await Appointment.findOne({
      _id: id,
      pet: {
        $in: (await Pet.find({ owner: userId }, "_id")).map((p) => p._id),
      },
    });

    if (!appointment) {
      return sendResponse({
        res,
        status: 404,
        message: "Appointment not found or unauthorized",
      });
    }

    await Appointment.findByIdAndDelete(id);
    return sendResponse({
      res,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return sendResponse({
      res,
      status: 500,
      message: "Error deleting appointment",
      error,
    });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findOne({
      _id: id,
      pet: {
        $in: (await Pet.find({ owner: userId }, "_id")).map((p) => p._id),
      },
    });

    if (!appointment) {
      return sendResponse({
        res,
        status: 404,
        message: "Appointment not found or unauthorized",
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate(["pet", "service"]);

    return sendResponse({
      res,
      message: "Appointment status updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    return sendResponse({
      res,
      status: 400,
      message: "Error updating appointment status",
      error,
    });
  }
};
