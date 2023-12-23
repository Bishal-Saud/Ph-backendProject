import express from "express";
import userRoutes from "./Routes/user.route.js";
import errorMiddleware from "./Middleware/error.middleware.js";
const app = express();
app.use(express.json()); // Add this line to parse JSON requests
// or
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded requests
app.use("/api/v1/user", userRoutes);

app.use("/running", (req, res) => {
  res.send("Everything is up to date");
});
app.get("*", (req, res) => {
  res.send("OOPS ! Page Not Found");
});

app.use(errorMiddleware);
export default app;
