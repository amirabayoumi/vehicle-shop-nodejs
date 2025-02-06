import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    merk: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    bouwjaar: {
      type: Number,
      required: true,
    },
    prijs: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["car", "motorcycle"],
    },
    cilinderinhoud: {
      type: Number,
      required: function (this: any) {
        return this.type === "motorcycle";  
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
