const list = [{ repo_id: "1001842697", repo_name: "test" }];
import { repositories } from "../samples/issues";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../../request";
import "./Repositories.css";
const Repositories = () => {
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState("");

  const filterbyname = (repos, reponame) => {
    if (!reponame.trim()) return repos;
    return repos.filter((repo) =>
      repo.repo_name.toLowerCase().includes(reponame.toLowerCase())
    );
  };

  const fetchRepos = async () => {
    const userId = "1f45d163-31fb-4df0-b346-f88c8ba840c1";
    sessionStorage.setItem("userId", userId);

    // const userId = sessionStorage.getItem("userId");
    await axios
      .get(`${backendURL}/repos/${userId}`)
      .then((response) => {
        const repoList = [...Object.values(response.data)];
        console.log(repoList);
        setRepos(repoList);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchRepos();
  }, []);

  const filteredname = filterbyname(repos, query);
  return (
    <div>
      <div class="heading-and-searchbar" className ="flex justify-center mt-[50vh]">
        <h2>Repositories</h2>
        {/* <p>List of repositories will be displayed here.</p> */}
        <input
          type="text"
          placeholder="Search repositories..."
          className="mb-4 p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
      </div>
      {/* <button className="mb-4 p-2 bg-blue-500 text-white rounded">
        Search
      </button> */}
      <div className="text-red-500">
        {filteredname.length > 0 ? (
          <ul>
            {filteredname.map((repos) => (
              <li key={repos.repo_id}>{repos.repo_name}</li>
            ))}
          </ul>
        ) : (
          <p>No matching results.</p>
        )}
      </div>
    </div>
  );
};
export default Repositories;
