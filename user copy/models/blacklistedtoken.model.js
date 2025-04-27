import mongoose from "mongoose";

const blacklistedtokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  },
  { timestamps: true }
);

export default mongoose.model("blacklistedtoken", blacklistedtokenSchema);
