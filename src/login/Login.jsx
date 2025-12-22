import React, { useState,useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { backendURL } from "../../request";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    await axios
      .post(`${backendURL}/login`, data)
      .then((response) => {
        const userInfo = response.data
        sessionStorage.setItem("userId", userInfo.user_id);
        sessionStorage.setItem("userName", userInfo.github_username);
        sessionStorage.setItem("isLoggedIn","true");
        navigate('/repos');
      })
      .catch((err) => {});
  };

  const handleGithubLogin = async (e) =>{
    

  }

  const gotoSignUp = () =>{
    navigate('/signup');
  }

  useEffect(() =>{
    sessionStorage.clear();
  },[]);

  return (
  <div
      className="flex flex-col justify-center items-center bg-zinc-950 h-max min-h-screen pb-5">
      <div
        className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6"
      >
        <div
          className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]"
        >
          <p className="text-[32px] font-bold text-white">Sign In</p>
          <p className="mb-2.5 mt-2.5 font-normal text-zinc-400">
            Enter your email and password to sign in!
          </p>
          {/* <div className="mt-8">
            <form className="pb-2">
              <input type="hidden" name="provider" value="Github" /><button
                className="hover:cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 bg-none hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-white py-6"
                type="submit"
              >
                <span className="mr-2"
                  ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                    <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                  </svg></span
                ><span>Github</span>
              </button>
            </form>
          </div> */}
          <div className="relative my-4">
            <div className="relative flex items-center py-1">
              <div className="grow border-t border-zinc-800"></div>
              <div className="grow border-t border-zinc-800"></div>
            </div>
          </div>
          <div>
            <form noValidate="" className="mb-4" onSubmit={handleLogin}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label className="text-white" htmlFor="email">
                    Email</label
                  ><input
                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    name="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  /><label
                    className="text-zinc-950 mt-2 dark:text-white"
                    htmlFor="password"
                    >Password</label
                  ><input
                    id="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  style = {{"backgroundColor":"white"}}
                  className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-950 hover:bg-white/90 active:bg-white/80 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium cursor-pointer"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p>
              <a
                style ={{"cursor":"pointer"}}
                className="font-bold text-[#646cff] text-sm" onClick={()=> gotoSignUp()}>
                Don't have an account? Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
