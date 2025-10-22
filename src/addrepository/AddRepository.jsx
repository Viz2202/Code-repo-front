import { useState, useEffect } from "react";
import { pullrequest } from "../samples/issues.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../request";
import { getdatetime, separatedatetime } from "../utilities/util.js";
import Expand from "../assets/expand.svg";

const AddRepository = () =>{
    const navigate = useNavigate();
    const [repos, setrepos] = useState([]);
    const [existingrepos, setexistrepo] = useState([]);
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
        return repos.map((repo,id)=>{
            const exists = existingrepos.find(obj => Number(obj.repo_id) === Number(repo.id))
            if(exists){
                console.log(repo.id)
                return null;
            }
            return(
                <div>
                    <div>
                        {repo.name}
                        <button onClick={() => addtorepo(repo.id,repo.name)}>Add</button>
                    </div>
                </div>
            );
        });
    };
    return(
        <div>
            <div>
                <h1>Add your Repositories from here</h1>
            </div>
            <div>
                {printrepos()}
            </div>
        </div>
    )
};
export default AddRepository
