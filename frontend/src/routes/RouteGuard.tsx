import { Navigate, Outlet} from "react-router-dom";
import { useGetUserQuery } from "../services/authapi";
import Loader from "../Components/GenericComponents/Loader/Loader";

type AllowedRoles = "admin" | "superAdmin" | "member"

const RouteGuard = ({ allowedRoles }: { allowedRoles?: AllowedRoles[] }) => {

  //IS LOGGED IN CHECKER
  const { data, isError ,isLoading } = useGetUserQuery() 

  if(isLoading)
    <Loader/>

  if(!data||isError)
    <Navigate to="signin"/>

  //IS AUTHORIZED CHECKER
  if(allowedRoles && !allowedRoles.includes(data?.data.globalRole)){
    <Navigate to="unauthorized"/>
  }
  return <Outlet/>
}

export default RouteGuard