import { useState, useEffect } from "react";
import { pullrequest } from "../samples/issues.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../request";
import SearchIcon from "../components/icons/gitpullrequest/search.jsx";
import { getdatetime, separatedatetime } from "../utilities/util.js";
import Expand from "../assets/expand.svg";

const AddRepository = () =>{
    const navigate = useNavigate();
    const [repos, setrepos] = useState([]);
    const [existingrepos, setexistrepo] = useState([]);
    const [query, setQuery] = useState("");
    const userId = sessionStorage.getItem("userId");
    const getexistingrepos= async() =>{
        await axios
        .get(`${backendURL}/repos/${userId}`)
        .then((response)=>{
            console.log(response.data);
            const checkRepoList = [...Object.values(response.data)]
            setexistrepo(checkRepoList);
        })
        .catch((err)=>{});
    }
    const addrepos= async() =>{
        await axios
            .get(`${backendURL}/repos/all-remote/${userId}`)
            .then((response)=>{
                const AddrepoList = [...Object.values(response.data).map(({name,id})=>({name,id}))];
                setrepos(AddrepoList);
            })
            .catch((err)=>{});
    };
    const addtorepo = async(repoid,reponame) =>{
        const data =
        {
            repo_id: String(repoid),
            repo_name: String(reponame),
            user_id: String(userId)
        };
        await axios.post(`${backendURL}/repos/`,data);
        navigate("/repos")
    }
    useEffect(()=>{
        addrepos();
        getexistingrepos();
    },[]);
    console.log(repos)
    console.log(existingrepos)
    const printrepos = () =>{
        return repos
        .filter(repo => repo.name.toLowerCase().includes(query.toLowerCase()))
        .map((repo,id)=>{
            const exists = existingrepos.find(obj => Number(obj.repo_id) === Number(repo.id))
            if(exists){
                console.log(repo.id)
                return null;
            }
            return(
                <div>
                    <div className="flex items-center px-4 sm:px-[20px] mx-4 sm:mx-[300px] h-12.5 border border-gray-500 mb-0">
                        <span className="w-20 sm:w-[200px] truncate text-sm sm:text-base text-left">{repo.name}</span>
                        <p className="text-gray-500 flex-1 text-center text-xs sm:text-base">By {sessionStorage.getItem("userName")}</p>
                        <button className="w-16 sm:w-[80px] text-sm sm:text-base cursor-pointer border-1 border-white-500 rounded-sm hover:bg-white hover:text-black transition-colors duration-300 ease-in-out" onClick={() => addtorepo(repo.id, repo.name)}>Add</button>
                    </div>
                </div>
            );
        });
    };
    return(
        <div className = "bg-zinc-950 text-white h-full w-full min-h-screen pb-[20px]">
            <div className="bg-black border-t border-b border-gray-500 flex items-center pl-8 md:pl-24 h-[100px]">
                <h1 className="text-2xl font-semibold">Add your Repositories from here.</h1>
            </div>
            <div className="flex items-center justify-center sm:justify-end text-white mb-[10px] mt-[15px] mx-4 sm:mx-[300px] gap-2">
                <SearchIcon color={"white"}/>
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border rounded w-full sm:w-auto max-w-[250px] sm:max-w-none text-sm sm:text-base"
                    style={{ height: "fit-content" }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div>
                {printrepos()}
            </div>
        </div>
    )
};
export default AddRepository
