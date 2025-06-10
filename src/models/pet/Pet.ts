import { Schema, model } from "mongoose";
import { IPet } from "./IPet";

const petSchema = new Schema<IPet>(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: false },
    age: { type: Number, required: true },
    weight: { type: Number, required: false },
    note: { type: String, default: null },
    image: { type: String, default: null },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<IPet>("Pet", petSchema);
