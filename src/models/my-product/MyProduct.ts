import { Schema, model } from "mongoose";
import { IMyProduct } from "./IMyProduct";

const myProductSchema = new Schema<IMyProduct>(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_product: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model<IMyProduct>("MyProduct", myProductSchema);
