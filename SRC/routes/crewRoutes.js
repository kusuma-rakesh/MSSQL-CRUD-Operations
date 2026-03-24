const express = require("express");
const router = express.Router();
const {
  addCrew,
  updateCrew,
  updateCrewPartial,
  fetchAllCrew,
  fetchCrewByEmpNo,
  removeCrewByEmpNo,
} = require("../controller/crewController");

// --20260325
router.post("/crew", addCrew);
router.put("/crew", updateCrew);
router.patch("/crew", updateCrewPartial);
router.get("/crew", fetchAllCrew);
router.get("/crew/:id", fetchCrewByEmpNo);
router.delete("/crew/:id", removeCrewByEmpNo);
module.exports = { router };
