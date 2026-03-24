const {
  insertCrew,
  updateCrewData,
  patchCrew,
  getAllCrews,
  getCrewByEmpno,
  delCrewByEmpno,
} = require("../Models/crewModel.js");
// --20260325
const addCrew = (req, res) => {
  const {
    EmpNo,
    LastName,
    FirstName,
    Gender,
    Email,
    Password,
    BirthDate,
    Skills,
  } = req.body;

  insertCrew(
    EmpNo,
    LastName,
    FirstName,
    Gender,
    Email,
    Password,
    BirthDate,
    Skills,
  )
    .then(() => {
      res.status(200).json({
        message: "Crew Inserted Successfulyl",
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        message: "somthing went wrong",
      });
    });
};

const updateCrew = (req, res) => {
  const {
    EmpNo,
    LastName,
    FirstName,
    Gender,
    Email,
    Password,
    BirthDate,
    Skills,
  } = req.body;
  updateCrewData(
    EmpNo,
    LastName,
    FirstName,
    Gender,
    Email,
    Password,
    BirthDate,
    Skills,
  )
    .then(() => {
      res.status(200).json({
        message: "Crew Updated Successfulyl",
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        message: "somthing went wrong -With Update",
      });
    });
};

const updateCrewPartial = (req, res) => {
  const { EmpNo, ...fields } = req.body;

  patchCrew(EmpNo, fields)
    .then((result) => {
      res.status(200).json({
        message: "Crew partially updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
};

const fetchAllCrew = (req, res) => {
  getAllCrews()
    .then((result) => {
      res.status(200).json({
        data: result.recordset,
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        message: "Error fetching crew members",
      });
    });
};

const fetchCrewByEmpNo = (req, res) => {
  const EmpNo = req.params.id;

  getCrewByEmpno(EmpNo)
    .then((result) => {
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Crew not found" });
      }

      res.status(200).json({
        data: result.recordset[0],
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        message: "Error fetching crew",
      });
    });
};

const removeCrewByEmpNo = (req, res) => {
  const EmpNo = req.params.id;

  delCrewByEmpno(EmpNo)
    .then((result) => {
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Crew not found" });
      }

      res.status(200).json({
        // data: result.recordset[0],
        message: `Deleted employee record ${EmpNo}`,
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        message: "Error deleting crew",
      });
    });
};
module.exports = {
  addCrew,
  updateCrew,
  updateCrewPartial,
  fetchAllCrew,
  fetchCrewByEmpNo,
  removeCrewByEmpNo,
};
