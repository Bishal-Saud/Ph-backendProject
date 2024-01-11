//Patients Details Model js

import { model, Schema } from "mongoose";

const patientsDetailsSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Title is required"],
      minLength: [8, "Title must be at least 8 characters "],
      maxLength: [60, "Title must be less than 60 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [8, "Description must be at least 8 characters "],
      maxLength: [260, "Description must be less than 260 characters"],
      trim: true,
    },
    sex: {
      type: String,
      required: [true, "category is required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Ward no is required"],
    },
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    number: {
      type: String,
      required: [true, "number is required"],
    },
    thumbnail: {
      public_Id: {
        type: String,
        required: true,
      },
      secure_Url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const patientsDetails = model("Details", patientsDetailsSchema);

export default patientsDetails;
