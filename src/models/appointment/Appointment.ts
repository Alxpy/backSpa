import { Schema, model } from "mongoose";
import { IAppointment } from "./IAppointment";

const appointmentSchema = new Schema<IAppointment>(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    pet: {
      type: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
      required: true,
    },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled",
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<IAppointment>("Appointment", appointmentSchema);
