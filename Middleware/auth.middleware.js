import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new AppError("Unauthenticated, please login again", 401));
    }

    const userDetails = await jwt.verify(token.process.env.JWT_SECRET);

    if (!userDetails) {
      return next(new AppError("Unauthorized, please login to continue", 401));
    }

    req.user = userDetails;
    next();
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};

const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {
      return next(
        new AppError(
          "You do not have permission to access this , please try again !!",
          401
        )
      );
    }
    next();
  };

const authorizedSubscriber = async (req, _res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }
  next();
};

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
