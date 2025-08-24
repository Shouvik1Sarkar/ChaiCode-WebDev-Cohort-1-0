import mongoose, { Schema } from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../utils/constants.js";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // added by me

    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        role: {
          type: String,
          enum: AvailableUserRoles,
          default: UserRolesEnum.PROJECT_ADMIN,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
