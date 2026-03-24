const express = require("express");
const app = express();

app.use("/", (req, res) => {
  console.log("In Use");
  res.send("Welcome Message");
});
app.listen(5050, () => {
  console.log("application is running on port 5050");
});
