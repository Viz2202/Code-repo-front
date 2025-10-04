import { repositories } from "../samples/issues";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../request";
import "./Repositories.css";

const Repositories = () => {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("");

  const filterbyname = (repos, reponame) => {
    if (!reponame.trim()) return repos;
    return repos.filter((repo) =>
      repo.repo_name.toLowerCase().includes(reponame.toLowerCase())
    );
  };

  const fetchRepos = async () => {
    const userId = sessionStorage.getItem("userId");

    await axios
      .get(`${backendURL}/repos/${userId}`)
      .then((response) => {
        const repoList = [...Object.values(response.data)];
        setRepos(repoList);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchRepos();
  }, []);

  const filteredname = filterbyname(repos, query);

  const clickRepo = (repo) => {
    sessionStorage.setItem("activeRepo", JSON.stringify(repo));
    navigate("/pr");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{ display: "flex", gap: "10px", height: "30%", width: "100%" }}
        >
          <div
            style={{ display: "flex", width: "50%", border: "1px solid red" }}
          >
            catchy one liner related to repositories
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              border: "1px solid red",
              padding: " 10px",
            }}
          >
            <div
              style={{ display: "flex", alignSelf: "flex-end", height: "20%" }}
            >
              <button style={{ height: "fit-content" }}>Add new repo</button>
            </div>
            <div style={{ display: "flex", height: "80%" }}>
              <input
                type="text"
                placeholder="Search repositories..."
                className="mb-4 p-2 border rounded"
                style={{ height: "fit-content" }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", height: "70%", border: "1px solid red" }}
        >
          {filteredname.length > 0 ? (
            <ul style={{ margin: "15px" }}>
              {filteredname.map((repos) => (
                <li key={repos.repo_id}>
                  <div
                    style={{
                      border: "2px solid yellow",
                      padding: "20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => clickRepo(repos)}
                  >
                    {repos.repo_name}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching results.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Repositories;
