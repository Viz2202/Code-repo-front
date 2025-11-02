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
      <div key={issue.file} className="pl-[20px] pr-[10px] md:pr-0">
        <p
          className="w-fit text-left text-[#D05E01] bg-[#353535] rounded text-sm md:text-base break-all md:break-normal"
          style={{
            "margin-bottom": "0.5rem",
            fontFamily: "'Courier Prime', monospace",
            paddingLeft: "5px",
            paddingRight: "5px",
            maxWidth: "calc(100vw - 40px)"
          }}
        >
          {issue.file}
        </p>
        <div
          className="text-left text-white pb-[30px] text-sm md:text-base overflow-x-auto"
          style={{ maxWidth: "calc(100vw - 30px)" }}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></div>
      </div>
    );
  });
  };

  return loading ? (
    <div className="preloader bg-zinc-950">
      <span className="typing-text text-white">
        {typedText}
        <span className="cursor text-white">|</span>
      </span>
    </div>
  ) : (
    <div className="bg-zinc-950 min-h-screen pt-[20px] px-[10px] md:px-0">
      <h1 className="heading-for-response text-red-500 text-2xl md:text-3xl lg:text-4xl px-[10px] pb-[15px]">
        {sessionStorage.getItem("prTitle")} (#{sessionStorage.getItem("prNumber")})
      </h1>
      <div>{printresponse(issues.issuelist)}</div>
    </div>
  );
};
export default Response;
