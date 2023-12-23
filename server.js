import app from "./app.js";
import dbConnect from "./Config/dbConnect.js";
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  dbConnect();
  console.log(`server is running -:   http://localhost:${PORT}`);
});
