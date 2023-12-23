import User from "../Model/user.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from "cloudinary";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7days

  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
};
const signIn = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const userExists = await User.findOne({ email });
    // console.log(userExists);
    if (userExists) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url: "abc",
      },
    });

    if (!user) {
      return next(new AppError("User registration failed", 400));
    }
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "ph",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          //remove file from server
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error || "File not uploaded please try again", 500)
        );
      }
    }

    await user.save();
    user.password = undefined;

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User register Successfully",
      user: user,
    });
  } catch (error) {
    return next(new AppError(`Something wrong ${error.message}`, 400));
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("ALL field required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!(user && (await user.comparePassword(password)))) {
      return next(
        new AppError(
          "Email or Password do not match or user does not exist",
          401
        )
      );
    }
    const token = await user.generateJWTtoken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User login Successfully",
      user,
    });
  } catch (error) {
    return new next(new AppError(`Something wrong ${error.message}`, 400));
  }
};

const logout = async (req, res, next) => {};

const showProfile = async (req, res, next) => {};

const forgotPassword = async (req, res, next) => {};

const resetPassword = async (req, res, next) => {};

const changePassword = async (req, res, next) => {};

const updateUser = async (req, res, next) => {};

export {
  signIn,
  logIn,
  logout,
  showProfile,
  changePassword,
  resetPassword,
  updateUser,
  forgotPassword,
};
