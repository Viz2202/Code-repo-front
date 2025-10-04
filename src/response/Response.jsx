import { useState, useEffect } from "react";
import { issues } from "../samples/issues.js";
import { formatText } from "../utilities/util.js";
import axios from "axios";
import { backendURL } from "../../request";
import "./Response.css";
const Response = () => {
  // const handleClick = (repoId) => {
  //     console.log(`Repository ID: ${repoId}`);
  // }
  const [airesponse, setairesponse] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [loading, setLoading] = useState(true);
  const text = "Checking your pull request.....";
  const repoDetails = JSON.parse(sessionStorage.getItem("activeRepo"));
  const pullRequestNumber = sessionStorage.getItem("prNumber");

  useEffect(() => {
    setTypedText(""); // Reset typed text
    let index = 0;

    const typingInterval = setInterval(() => {
      const currentChar = text.charAt(index);

      setTypedText((prev) => {
        const newText = prev + currentChar;
        return newText;
      });

      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);
  const fetchairesponse = async () => {
    await axios
      .get(`${backendURL}/issues/${repoDetails.repo_id}_${pullRequestNumber}`)
      .then((response) => {
        const issues = Object.values(response.data.issues)[0].issuelist;
        setairesponse(issues);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchairesponse();
  }, []);

  const printresponse = (issuearray) => {
    return airesponse.map((issue) => {
      const text = issue.issues;
      const cleanText = text.replace(/\\\\n/g, "\n");
      const formattedText = formatText(cleanText);
      return (
        <div key={issue.file} style={{ paddingLeft: "20px" }}>
          <p
            className="w-fit text-left text-[#D05E01] bg-[#353535] rounded"
            style={{
              "margin-bottom": "0.5rem",
              fontFamily: "'Courier Prime', monospace",
              paddingLeft: "5px",
              paddingRight: "5px",
            }}
          >
            {issue.file}
          </p>
          <div
            style={{ "margin-bottom": "2.5rem" }}
            className="text-left text-white"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></div>
        </div>
      );
    });
  };
  return loading ? (
    <div className="preloader">
      <span className="typing-text">
        {typedText}
        <span className="cursor">|</span>
      </span>
    </div>
  ) : (
    <div>
      <h2>Response Page</h2>
      <p>Responses</p>
      <div>{printresponse(issues.issuelist)}</div>
    </div>
  );
};
export default Response;
