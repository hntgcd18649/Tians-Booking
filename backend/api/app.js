import express from "express";

const app = express();

app.use("/api/test", (req, res) => {
  res.send("Hello, world!");
});

app.listen(8800, () => {
  console.log("server is running on port 8800");
});
