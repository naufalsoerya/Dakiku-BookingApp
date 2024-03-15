import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    // loader: () => {
    //   if (localStorage.accessToken) {
    //     return redirect("/cuisine");
    //   }

    //   return null;
    // },
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

export default router;
