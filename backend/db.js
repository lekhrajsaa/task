const Pool = require("pg").Pool;
require("dotenv").config();

const PASSWORD = process.env.PASSWORD;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "company_details",
  password: PASSWORD,
  port: "5432",
});

const getDetails = () => {
  return new Promise(function (resolve, reject, res) {
    pool.query("SELECT * FROM data ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const addDetails = (body) => {
  return new Promise(function (resolve, reject) {
    const { company_name, cin } = body;

    pool.query(
      "INSERT INTO data (company_name, cin) VALUES ($1, $2) RETURNING *",
      [company_name, cin],
      (error) => {
        if (error) {
          reject(error);
        }
        resolve("NEW DATA ADDED");
      }
    );
  });
};

module.exports = {
  getDetails,
  addDetails,
};
