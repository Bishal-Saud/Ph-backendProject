import { Router } from "express";
import {
  createPatientsDetails,
  getPatientsData,
  removeDetails,
} from "../Controllers/patientDetails.controller.js";
import { authorizedRoles, isLoggedIn } from "../Middleware/auth.middleware.js";
import upload from "../Middleware/upload.middleware.js";

const router = Router();

router
  .route("/")
  .get(getPatientsData)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createPatientsDetails
  )

  .delete(isLoggedIn, authorizedRoles("ADMIN"), removeDetails);

router.route("/:id").put(isLoggedIn, authorizedRoles("ADMIN"));

export default router;
