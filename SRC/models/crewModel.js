const { conn, sqlconnection } = require("../config/database.js");

//insert user into SampleCrew SQL Table
const insertCrew = (
  EmpNo,
  LastName,
  FirstName,
  Gender,
  Email,
  Password,
  BirthDate,
  Skills,
) => {
  return sqlconnection.then((sql) => {
    const skillsString = Skills.join(",");
    // const skillsString2 = JSON.stringify(Skills);
    return sql
      .request()
      .input("EmpNo", conn.Int, EmpNo)
      .input("LastName", conn.VarChar(255), LastName)
      .input("FirstName", conn.VarChar(255), FirstName)
      .input("Gender", conn.VarChar(255), Gender)
      .input("Email", conn.VarChar(255), Email)
      .input("Password", conn.VarChar, Password)
      .input("BirthDate", conn.Date, BirthDate)
      .input("Skills", conn.VarChar, skillsString)
      .query(`insert into SampleCrew(EmpNo,LastName,FirstName,Gender,Email,Password,BirthDate,Skills)
        VALUES(@EmpNo, @LastName, @FirstName, @Gender, @Email, @Password, @Birthdate, @Skills)`);
  });
};

//Update user into SampleCrew SQL Table --20260325
const updateCrewData = (
  EmpNo,
  LastName,
  FirstName,
  Gender,
  Email,
  Password,
  BirthDate,
  Skills,
) => {
  return sqlconnection.then((sql) => {
    const skillsString = Skills.join(",");
    // const skillsString2 = JSON.stringify(Skills);
    return sql
      .request()
      .input("EmpNo", conn.Int, EmpNo)
      .input("LastName", conn.VarChar(255), LastName)
      .input("FirstName", conn.VarChar(255), FirstName)
      .input("Gender", conn.VarChar(255), Gender)
      .input("Email", conn.VarChar(255), Email)
      .input("Password", conn.VarChar, Password)
      .input("BirthDate", conn.Date, BirthDate)
      .input("Skills", conn.VarChar, skillsString).query(`
        update SampleCrew 
        Set LastName = @LastName,
            FirstName = @FirstName,
            Gender = @Gender,
            Email = @Email,
            Password = @Password,
            BirthDate = @BirthDate,
            Skills = @Skills
        Where EmpNo = @EmpNo        
        `);
  });
};

//Patch - update required fields only in the table
const patchCrew = (EmpNo, updateFields) => {
  return sqlconnection.then((pool) => {
    let query = "UPDATE SampleCrew SET ";
    const request = pool.request();

    let updates = [];

    if (updateFields.FirstName) {
      updates.push("FirstName = @FirstName");
      request.input("FirstName", conn.VarChar(255), updateFields.FirstName);
    }

    if (updateFields.LastName) {
      updates.push("LastName = @LastName");
      request.input("LastName", conn.VarChar(255), updateFields.LastName);
    }

    if (updateFields.Gender) {
      updates.push("Gender = @Gender");
      request.input("Gender", conn.VarChar(255), updateFields.Gender);
    }

    if (updateFields.BirthDate) {
      updates.push("BirthDate = @BirthDate");
      request.input("BirthDate", conn.VarChar(255), updateFields.BirthDate);
    }

    if (updateFields.Email) {
      updates.push("Email = @Email");
      request.input("Email", conn.VarChar(255), updateFields.Email);
    }

    if (updateFields.Password) {
      updates.push("Password = @Password");
      request.input("Password", conn.VarChar(255), updateFields.Password);
    }

    if (updateFields.Skills) {
      //const skillsJson = JSON.stringify(updateFields.Skills);
      const skillsString = updateFields.Skills.join(",");
      updates.push("Skills = @Skills");
      request.input("Skills", conn.VarChar(conn.MAX), skillsString);
    }

    query += updates.join(", ");
    query += " WHERE EmpNo = @EmpNo";
    request.input("EmpNo", conn.Int, EmpNo);
    return request.query(query);
  });
};

//select users from table
const getAllCrews = () => {
  return sqlconnection.then((sqlconn) => {
    const qry = `select EmpNo,LastName,FirstName,Gender,Email,Password,BirthDate,Skills from SampleCrew`;
    console.log("Select Query:", qry);
    return sqlconn.request().query(qry);
  });
};

//fetch crew members with EmpNo
const getCrewByEmpno = (EmpNo) => {
  return sqlconnection.then((sqlconn) => {
    const query = `
      SELECT EmpNo, LastName, FirstName, Gender, Email, password, BirthDate, Skills
      FROM SampleCrew
      WHERE EmpNo = @EmpNo
    `;

    return sqlconn.request().input("EmpNo", conn.Int, EmpNo).query(query);
  });
};

//delete crew members with EmpNo
const delCrewByEmpno = (EmpNo) => {
  return sqlconnection.then((sqlconn) => {
    const query = `
      delete from SampleCrew where EmpNo = @EmpNo
    `;
    return sqlconn.request().input("EmpNo", conn.Int, EmpNo).query(query);
  });
};

module.exports = {
  insertCrew,
  updateCrewData,
  patchCrew,
  getAllCrews,
  getCrewByEmpno,
  delCrewByEmpno,
};
