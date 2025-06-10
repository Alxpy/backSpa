import mongoose from "mongoose";

export interface IAppointment { 
  date: Date;
  time: string;
  pet: mongoose.Types.ObjectId[];
  service: mongoose.Types.ObjectId;
  notes: string;
  status: "scheduled" | "completed" | "canceled";
}