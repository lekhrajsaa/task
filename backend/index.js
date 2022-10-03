const express = require("express");
const data = require("./data");
const app = express();
require("dotenv").config();
const company_details = require("./db");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  company_details
    .getDetails()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/data", (req, res) => {
  company_details
    .addDetails(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.get("/api/data/:company", (req, res) => {
  const company_name = data.find((d) => d.company === req.params.company);
  res.send(company_name);
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
});
