import express from "express";

const app = express();

app.use("/running", (req, res) => {
  res.send("Everything is up to date");
});

export default app;
