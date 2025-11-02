import { useState, useEffect } from "react";
import { pullrequest } from "../samples/issues.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../request";
import { getdatetime, separatedatetime } from "../utilities/util.js";
import Expand from "../assets/expand.svg";
import "./pullRequest.css";
import ArrowIcon from "../components/icons/gitpullrequest/arrow.jsx";

const PullRequest = () => {
  const navigate = useNavigate();
  const [pullrequests, setpullrequests] = useState([]);
  const [showList, setShowList] = useState([]);
  const [listData, setListData] = useState({});
  const repoDetails = JSON.parse(sessionStorage.getItem("activeRepo"));
  const userName = sessionStorage.getItem("userName");

  const fetchprs = async () => {
    await axios
      .get(`${backendURL}/pull-requests/all-remote/${repoDetails.repo_id}`)
      .then((response) => {
        setpullrequests(response.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchprs();
  }, []);

  const getResponses = async (pull_request_number) => {
    await axios
      .get(
        `${backendURL}/issues/ids/${repoDetails.repo_id}_${pull_request_number}`
      )
      .then((response) => {
        const list = response.data.ids.map((res) => {
          return getdatetime(res);
        });
        setListData((prevState) => {
          return { ...prevState, [pull_request_number]: list };
        });
      })
      .catch((err) => {});
  };

  const toggleExpand = (prNumber) => {
    if (showList.indexOf(prNumber) !== -1) {
      setShowList((prevState) => {
        return prevState.filter((pr) => pr !== prNumber);
      });
    } else {
      setShowList((prevState) => [...prevState, prNumber]);
      getResponses(prNumber);
    }
  };

  const goToResponse = (prNumber,prTitle) => {
    sessionStorage.setItem("prNumber", prNumber);
    sessionStorage.setItem("prTitle", prTitle);
    navigate("/response");
  };

  const startReview = async (prNumber,prTitle) => {
    const data = {
      prnumber: prNumber,
      repo_name: repoDetails.repo_name,
      user_name: userName,
      repo_id: repoDetails.repo_id,
    };
    await axios.post(`${backendURL}/pull-requests/`, data);
    goToResponse(prNumber,prTitle);
  };

  const printprs = () => {
    return pullrequests.map((pr, index) => {
      return (
        <div
          key={pr.number}
          className="flex flex-col justify-center items-center bg-[#353535] p-3 sm:p-4 rounded-xl"
        >
          <div className="flex w-full justify-between flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="flex gap-2 sm:gap-4">
              <div onClick={() => toggleExpand(pr.number)}>
                <img
                  src={Expand}
                  className={`w-[35px] sm:w-[45px] transition-transform duration-400 ease-in-out cursor-pointer ${
                    showList.indexOf(pr.number) !== -1 ? "scale-y-[-1]" : ""
                  }`}
                />
              </div>

              <div className="pull-request-item ml-2 sm:ml-5 flex-1 min-w-0">
                <p className="font-bold text-left text-red-500 mb-2 text-sm sm:text-base break-words">
                  {pr.title} (#{pr.number})
                </p>
                <p className="flex items-center text-left text-white gap-2 text-xs sm:text-base flex-wrap">
                  <span className="truncate max-w-[100px] sm:max-w-none">{pr.source_branch}</span>
                  <span className="flex items-center flex-shrink-0">
                    <ArrowIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                  <span className="truncate max-w-[100px] sm:max-w-none">{pr.target_branch}</span>
                </p>
              </div>
            </div>

            <div
              className="flex justify-end sm:justify-start"
              onClick={() => startReview(pr.number,pr.title)}
            >
              <button className="bg-red-500 hover:bg-white hover:text-red-500 text-white px-3 py-1 rounded transition-all duration-200 cursor-pointer text-sm sm:text-base w-full sm:w-auto">
                Review
              </button>
            </div>
          </div>

          {showList.indexOf(pr.number) !== -1 && (
            <ul className="flex w-full flex-col items-start px-4 sm:px-[62px] mt-4 gap-3 text-white text-sm sm:text-base">
              {listData[pr.number]?.map((list, i) => (
                <li
                  key={i}
                  onClick={() => goToResponse(pr.number,pr.title)}
                  className="text-left text-base transition-transform duration-200 hover:cursor-pointer hover:scale-102 inline-block break-words w-full"
                >
                  {separatedatetime(list)}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    });
  };
  
  return (
    <div className="bg-zinc-950 min-h-screen px-4 sm:px-8 lg:px-0">
      <h2 className="border-t pt-[20px] border-gray-500 text-white text-xl sm:text-2xl font-semibold">
        Pull Requests
      </h2>
      <p className="text-gray-300 text-sm sm:text-base">
        List of pull requests will be displayed here.
      </p>

      <div className="w-full lg:px-[264px] mt-[30px] sm:mt-[50px] flex flex-col gap-[15px] sm:gap-[20px]">
        {printprs(pullrequest)}
      </div>
    </div>
  );

};
export default PullRequest;
