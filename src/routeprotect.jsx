import { Navigate } from "react-router-dom";

function RouteProtect({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);
  console.log(typeof(isLoggedIn));
  return isLoggedIn === "true" ? children : <Navigate to="/" replace />;
}

export default RouteProtect;
