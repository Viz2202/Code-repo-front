import { repositories } from "../samples/issues";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../request";
import "./Repositories.css";
import gitpullrequest from "../assets/gitpullrequest.svg"
import GitPull from "../components/icons/gitpullrequest/gitpullrequest";
import RemoveRepo from "../components/icons/gitpullrequest/removerepo";
import SearchIcon from "../components/icons/gitpullrequest/search";
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
        <div className="relative h-[300px] w-full">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover filter blur-sm"
            style={{ backgroundImage: "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWN1bGQzZmtmbWRkcGFwcHVhczJ6dWx3ZjA0MGoxbHppdDVsOTR5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J9Ny6ynhLxzRm/giphy.gif')" }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <h1 className="text-white text-6xl font-bold">Where bugs go to die (mostly)</h1>
          </div>
        </div>
        <div className = "flex flex-row items-center justify-between ml-5 mr-5">
          <div className="flex text-white items-center gap-2">
            <SearchIcon color={"white"}/>
            <input
              type="text"
              placeholder="Search repositories..."
              className="p-2 border rounded"
              style={{ height: "fit-content" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className = "text-white bg-[#1b1919] cursor-pointer h-10 w-30 rounded hover:border-1 border-blue-500 transtion-colors duration-100 ease-in-out items-center" onClick = {()=>clickaddrepo()}>Add new repo</button>
        </div>
        <div className="flex flex-row justify-between h-0.7 w-full px-5">
          {filteredname.length > 0 ? (
            <ul className="w-full">
              {filteredname.map((repos) => (
                <li key={repos.repo_id}>
                  <div className="flex items-center text-white border-t border-b border-gray-300 py-4 px-5 h-20 w-full rounded-none">
                    <span className="flex-1 w-[200px] truncate text-left">{repos.repo_name}</span>
                    <span className="text-gray-500 flex-1 text-center">
                      By {sessionStorage.getItem("userName")}
                    </span>
                    <div className="flex flex-1 justify-end gap-2">
                      <button
                        className="border-2 border-white p-2 rounded hover:border-[#535bf2] cursor-pointer transition duration-100 ease-linear"
                        onClick={() => clickRepo(repos)}
                      >
                        <GitPull color={'white'} />
                      </button>
                      <button
                        className="border-2 border-white p-2 rounded hover:border-[#FF6347] cursor-pointer transition duration-100 ease-linear"
                        onClick={() => deleteRepo(repos)}
                      >
                        <RemoveRepo color={'white'} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-[10px] text-white text-center item-center">No matching results.........</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Repositories;
