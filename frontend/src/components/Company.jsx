import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Company.module.css";

const Company = () => {
  const [companyDetails, setCompanyDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:5000")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCompanyDetails(data);
      });
  }

  const btnHandler = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles["sub-container"]}>
        <button className={styles.btn} onClick={btnHandler}>
          ADD COMPANY +
        </button>
        <h1 className={styles.title}>COMPANY DETAILS</h1>
        <Table>
          <thead>
            <tr>
              <th className={styles.tablename}>COMPANY NAME</th>
              <th>CIN</th>
            </tr>
          </thead>
          {companyDetails
            ? companyDetails.map((data) => {
                return (
                  <tbody key={data.id}>
                    <td className={styles.tablename}>{data.company_name}</td>
                    <td className={styles.tablecin}>{data.cin}</td>
                  </tbody>
                );
              })
            : "NO DATA AVAILABLE"}
        </Table>
      </div>
    </div>
  );
};

export default Company;
