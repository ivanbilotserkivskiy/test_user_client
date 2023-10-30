import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie/es6/Cookies";

const cookies = new Cookies();

const PrivateRoute: React.FC<unknown> = () => {
  let auth = "";

  auth = cookies.get("jwt_authorization");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
