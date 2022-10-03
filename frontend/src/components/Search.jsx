import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [getCompany, setGetCompany] = useState("");

  const navigate = useNavigate();

  const setCompany = async () => {
    const { data } = await axios.get("/api/data");
    setGetCompany(data);
  };

  useEffect(() => {
    setCompany();
  }, []);

  const searchHandler = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const buttonHandler = (searchTerm, searchCIN) => {
    setSearch(searchTerm);
    let company_name = searchTerm;
    let cin = searchCIN;
    fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ company_name, cin }),
    }).then((response) => {
      return response.text();
    });
    navigate("/company");
  };
  return (
    <div className={styles.container}>
      <div className={styles["sub-container"]}>
        <div className={styles["input-group"]}>
          <input type="text" value={search} onChange={searchHandler} />
          <div className={styles.button}>
            <button
              onClick={() => buttonHandler(search)}
              className={styles.btn}
            >
              SEARCH
            </button>
          </div>
        </div>
        <div className={styles.dropdown}>
          {getCompany?.length > 0 &&
            getCompany
              .filter((item) => {
                const searchTerm = search.toLowerCase();
                const companyName = item.company.toLowerCase();

                return (
                  searchTerm &&
                  companyName.startsWith(searchTerm) &&
                  companyName !== searchTerm
                );
              })
              .map((company) => {
                return (
                  <div
                    onClick={() => buttonHandler(company.company, company.cin)}
                    className={styles.row}
                    key={company.id}
                  >
                    {company.company}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Search;
