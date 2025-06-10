// src/controllers/service.controller.ts
import { Request, Response } from 'express';
import Service from '../models/Service/Service';
import { sendResponse } from '../utils/response';

export const createService = async (req: Request, res: Response) => {
  try {

    const { name, description, price, duration, image, category } = req.body;
    const service = new Service({
      name,
      description,
      price,
      duration,
      image,
      category,
      owner_id: req.userId
    });
    await service.save();
    sendResponse({ res, message: 'Service created successfully', data: service });
  } catch (error) {
    sendResponse({
      res,
      status: 400,
      message: 'Error creating service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    sendResponse({
      res,
      message: 'Services fetched successfully',
      data: services
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: 'Error fetching services',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return sendResponse({
        res,
        status: 404,
        message: 'Service not found'
      });
    }
    sendResponse({
      res,
      status: 200,
      message: 'Service fetched successfully',
      data: service
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: 'Error fetching service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!service) {
      return sendResponse({
        res,
        status: 404,
        message: 'Service not found'
      });
    }
    sendResponse({
      res,
      status: 200,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    sendResponse({
      res,
      status: 400,
      message: 'Error updating service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return sendResponse({
        res,
        status: 404,
        message: 'Service not found'
      });
    }
    sendResponse({
      res,
      status: 200,
      message: 'Service deleted successfully',
      data: service
    });
  } catch (error) {
    sendResponse({
      res,
      status: 500,
      message: 'Error deleting service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};