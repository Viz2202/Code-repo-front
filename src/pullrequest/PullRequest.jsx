import { useState, useEffect } from "react";
import { pullrequest } from "../samples/issues.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../../request";
import { getdatetime, separatedatetime } from "../utilities/util.js";
import Expand from "../assets/expand.svg";
import "./pullRequest.css";

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

  const goToResponse = (prNumber) => {
    sessionStorage.setItem("prNumber", prNumber);
    navigate("/response");
  };

  const startReview = async (prNumber) => {
    const data = {
      prnumber: prNumber,
      repo_name: repoDetails.repo_name,
      user_name: userName,
      repo_id: repoDetails.repo_id,
    };
    await axios.post(`${backendURL}/pull-requests/`, data);
    goToResponse(prNumber);
  };

  const printprs = () => {
    return pullrequests.map((pr, index) => {
      return (
        <div
          className="flex"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#353535",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <div key={pr.number} className="flex w-full justify-between">
            <div className="flex gap-4">
              <div onClick={() => toggleExpand(pr.number)}>
                <img
                  src={Expand}
                  style={{
                    width: "45px",
                    transform:
                      showList.indexOf(pr.number) !== -1 ? "scaleY(-1)" : "",
                    transition: "transform 0.4s ease",
                  }}
                />
              </div>
              <div key={pr.number} className="pull-request-item ml-5">
                <p
                  className="font-bold text-left text-red-500"
                  style={{ marginBottom: "0.5rem" }}
                >
                  {pr.title} (#{pr.number})
                </p>
                <p className="text-left">
                  {pr.source_branch} ➡️ {pr.target_branch}{" "}
                </p>
              </div>
            </div>
            <div className="justify-end" onClick={() => startReview(pr.number)}>
              <button>Review</button>
            </div>
          </div>
          {showList.indexOf(pr.number) !== -1 && (
            <ul
              className="flex w-full"
              style={{
                flexDirection: "column",
                alignItems: "start",
                padding: "0 62px",
                marginTop: "16px",
                gap: "12px",
              }}
            >
              {listData[pr.number]?.map((list, i) => (
                <li
                  onClick={() => goToResponse(pr.number)}
                  className="hoverDate"
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
    <div>
      <h2>Pull Requests</h2>
      <p>List of pull request will be displayed here.</p>
      <div
        style={{
          width: "100%",
          padding: "0 264px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {printprs(pullrequest)}
      </div>
    </div>
  );
};
export default PullRequest;
