import { Schema, model } from "mongoose";
import { IUser } from "./IUser";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    address: { type: String, required: false },
    document: { type: String, required: false },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
  },
  { timestamps: true, versionKey: false }
);

export default model<IUser>("User", userSchema);
