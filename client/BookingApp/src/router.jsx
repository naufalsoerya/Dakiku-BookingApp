import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import BookingForm from "./pages/BookingForm";
import BookingPage from "./pages/BookingPage";
import EventPage from "./pages/EventPage";
import EventForm from "./pages/EventForm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.accessToken) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    element: <MainLayout />,
    loader: () => {
      if (localStorage.accessToken) {
        return null;
      }

      return redirect("/login");
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />
      },
      {
        path: "/booking/form/:id",
        element: <BookingForm />
      },
      {
        path: "/booking/list",
        element: <BookingPage />
      },
      {
        path: "/event/list",
        element: <EventPage />
      },
      {
        path: "/event/form",
        element: <EventForm />
      }
    ],
  },
]);

export default router;
