//Patients Details Controller
import AppError from "../utils/error.utils.js";
import patientsDetails from "../Model/patientsDetails.model.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getPatientsData = async (req, res, next) => {
  try {
    const details = await patientsDetails.find({}).select("-number");

    res.status(200).json({
      success: true,
      message: "All Patients Details",
      details,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const createPatientsDetails = async (req, res, next) => {
  try {
    const { username, description, sex, age, dateOfBirth } = req.body;

    if (!username || !description || !sex || !age || !dateOfBirth) {
      return next(new AppError("All field required", 500));
    }

    const patient = await patientsDetails.create({
      username,
      description,
      sex,
      age,
      dateOfBirth,
      thumbnail: {
        public_Id: "dum",
        secure_Url: "dum",
      },
    });
    if (!patient) {
      return next(new AppError("PatientData could not created", 500));
    }
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "pharmacy",
          crop: "fill",
        });
        // console.log(JSON.stringify(result));
        if (result) {
          course.thumbnail.public_Id = result.public_id;
          course.thumbnail.secure_Url = result.secure_url;
        }

        // delete
        fs.rm(`uploads/${req.file.filename}`);
      } catch (e) {
        return next(new AppError(e.message, 500));
      }

      await patient.save();

      res.status(200).json({
        success: true,
        message: "Patient Created Successfully ",
        course,
      });
    }
  } catch (error) {
    return next(new AppError(error.message || "Not Created ! Try again", 500));
  }
};

const updateDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await patientsDetails.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );
    if (!patient) {
      return next(
        new AppError(
          error.message || "Given Course by id doesn't exist ! Try again",
          500
        )
      );
    }
    res.status(200).json({
      success: true,
      message: "Course update Successfully",
      patient,
    });
  } catch (error) {
    return next(new AppError(error.message || "Not Updated ! Try again", 500));
  }
};

const removeDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await patientsDetails.findByIdAndDelete(id);

    if (!course) {
      return next(
        new AppError(
          error.message || "Given Course by id doesn't exist ! Try again",
          500
        )
      );
    }

    res.status(200).json({
      success: true,
      message: "Patients details deleted Successfully",
    });
  } catch (error) {
    return next(
      new AppError(error.message || "Course doesn't removed ! Try again", 500)
    );
  }
};

export { getPatientsData, createPatientsDetails, updateDetails, removeDetails };
