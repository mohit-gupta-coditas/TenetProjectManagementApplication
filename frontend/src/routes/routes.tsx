import { lazy, Suspense } from "react";
import { createBrowserRouter} from "react-router-dom";
import Loader from "../Components/GenericComponents/Loader/Loader";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
const Login = lazy(() => import("../pages/login/Login"))

export const routes = createBrowserRouter([
  {
    path: "/signin", element:
      <Suspense fallback={<Loader />}>
        <Login></Login>
      </Suspense>
  },
  {
    path:"unauthorized",element:<Unauthorized/>
  },
])