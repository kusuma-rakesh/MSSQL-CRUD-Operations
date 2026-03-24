const conn = require("mssql");

const config = {
  user: "cp_sc_t2_deployuser",
  password: "cp_sc_t2_deployuser",
  server: "10.130.0.157",
  port: 1433,
  database: "AICS_CMS_DB_Generic",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const sqlconnection = conn.connect(config);
module.exports = { conn, sqlconnection };
