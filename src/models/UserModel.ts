import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png",
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vehicle",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
