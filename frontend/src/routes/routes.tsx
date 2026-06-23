import { lazy, Suspense } from "react";
import { createBrowserRouter} from "react-router-dom";
import Loader from "../Components/GenericComponents/Loader/Loader";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import RouteGuard from "./RouteGuard";
import Layout from "../Components/Layout/Layout";
import RoleRouter from "./RoleRouter"
import SuperAdmin from "../pages/SuperAdmin/SuperAdmin";
const Login = lazy(() => import("../pages/login/Login"))

export const routes = createBrowserRouter([
  {
    path: "signin", element:
      <Suspense fallback={<Loader />}>
        <Login></Login>
      </Suspense>
  },
  {
    path:"unauthorized",element:<Unauthorized/>
  },
  {
    element:<RouteGuard/>,
    children:
    [
      { 
        path:"/",
        element:<Layout/>,
        children:[
          { index:true, element:<RoleRouter/>         
          },
          {
            element:<RouteGuard allowedRoles={["superAdmin"]}/>,
            children:
            [
              {
                path:"controlpanel",
                element:<SuperAdmin/>
              }
            ]
          }
        ]
      }
    ]
  }
])