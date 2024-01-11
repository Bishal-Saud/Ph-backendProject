import app from "./app.js";
import dbConnect from "./Config/dbConnect.js";
import { v2 } from "cloudinary";

const PORT = process.env.PORT || 3005;

//cloudinary configuration

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`server is running :  http://localhost:${PORT}`);
});
