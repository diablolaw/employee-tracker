const mysql = require("mysql2");
const { rootCertificates } = require("tls");
require("dotenv").config();

const PORT = process.env.PORT || 3306;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "company_db",
  },
  console.log("Connected to the company_db database")
);

module.exports = db;
