const express = require("express");
const app = express();
app.use(express.json());
const { router } = require("./routes/crewRoutes.js");

// --20260325
app.use("/api", router);

app.listen(5050, () => {
  console.log("application is running on port 5050");
});
