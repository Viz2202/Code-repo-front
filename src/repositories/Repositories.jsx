import { repositories } from "../samples/issues";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../request";
import "./Repositories.css";
import gitpullrequest from "../assets/gitpullrequest.svg"
import GitPull from "../components/icons/gitpullrequest/gitpullrequest";
import RemoveRepo from "../components/icons/gitpullrequest/removerepo";
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

  const deleteRepo = async(repo) =>{
    const repoId = repo.repo_id
    await axios
    .delete(`${backendURL}/repos/remove/${repoId}`)
    fetchRepos();
  }

  const clickaddrepo = () =>{
    navigate("/addrepo");
  }
  return (
    <>
      <div

        className="flex flex-col gap-3 h-full w-full bg-zinc-950 min-h-screen "
      >
        <div
          className="text-center flex flex-row items-center mx-[20px]"
        >
          <h1
            className="text-white text-5xl font-bold mb-4"
          >
            Manage and Track your Activity here
          </h1>
          <div
            className="flex flex-row items-center p-10 border-1 w-1/4 border-red-500"
          >
            <div
              className="justify-centerself-end h-[20%]"
            >
              <button className = "text-white bg-[#1b1919] cursor-pointer h-10 w-30 rounded hover:border-1 border-blue-500 transtion-colors duration-100 ease-in-out" onClick = {()=>clickaddrepo()}>Add new repo</button>
            </div>
          </div>
        </div>
        <div
          className = "flex flex-col h-0.7 border-1 border-red-500 w-full"
        >
          <div className="justify-center text-white w-full">
            <input
              type="text"
              placeholder="Search repositories..."
              className="mb-4 p-2 border rounded"
              style={{ height: "fit-content" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {filteredname.length > 0 ? (
            <ul style={{ margin: "15px" }}>
              {filteredname.map((repos) => (
                <li key={repos.repo_id}>
                  <div className="text-white bg-[#1b1919] p-[20px] rounded-[10px] h-20 w-full">
                    {repos.repo_name}
                    <button className="border-2 border-white p-2 rounded hover:border-[#535bf2] cursor-pointer transition duration-100 ease-linear" onClick={() => clickRepo(repos)}><GitPull color={'white'}/></button>
                    <button className="border-2 border-white p-2 rounded hover:border-[#FF6347] cursor-pointer transition duration-100 ease-linear" onClick={() => deleteRepo(repos)}><RemoveRepo color = {'white'}/></button>
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
