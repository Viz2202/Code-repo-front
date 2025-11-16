import { Navigate } from "react-router-dom";

function RouteProtect({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if(!isLoggedIn){
    console.log(isLoggedIn)
    sessionStorage.clear();
    <Navigate to="/" replace />
  }
  return children; /*isLoggedIn === "true" ? children : <Navigate to="/" replace />*/
}

export default RouteProtect;
