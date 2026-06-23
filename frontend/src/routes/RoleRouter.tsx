import { Navigate } from "react-router-dom";
import Loader from "../Components/GenericComponents/Loader/Loader";
import { useGetUserQuery } from "../services/authapi";

const RoleRouter=()=>{
  const { data, isLoading } = useGetUserQuery();
  if (isLoading) return <Loader />;
  if (!data) return <Navigate to="/signin"/>;
  if (data?.data.globalRole === "superAdmin") {
    return <Navigate to="controlpanel" />;
  }
}

export default RoleRouter
