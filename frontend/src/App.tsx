import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes"
import { AuthProvider } from "./context/authContext";

const App=()=>{
  return(
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={routes}/>
      </AuthProvider>
    </Provider>
  );
}
export default App