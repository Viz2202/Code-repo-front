import { Navigate } from "react-router-dom";

function RouteProtect({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? children : <Navigate to="/" replace />;
}

export default RouteProtect;
