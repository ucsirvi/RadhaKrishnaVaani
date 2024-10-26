import { Schema, model } from "mongoose";

const quoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Quote = model("Quote", quoteSchema);

export default Quote;
