import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Loader from "../Components/GenericComponents/Loader/Loader";
import useAuth from "../context/authContext";
import Layout from "../Components/Layout/Layout";
const Login = lazy(() => import("../pages/login/Login"))


export const currentRole = () => {
  const userRole=localStorage.getItem("currentRole")
  if (!userRole) {
    return "/signin"
  }
  return `/${userRole}`
}

export const routes = createBrowserRouter([
  {
    path: "/signin", element:
      <Suspense fallback={<Loader />}>
        <Login></Login>
      </Suspense>
  },
  {
    path: "/", Component: Layout, children: [
      { index: true, loader: () => redirect(currentRole()) },
    ]
  },
])