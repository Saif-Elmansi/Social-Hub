import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Componants/Layout/Layout";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import MainHome from "./Page/MainHome/MainHome";
import BodyGard from "./Componants/BodyGard/BodyGard";
import InnversGard from "./Componants/BodyGard/InnversGard";
import NotFound from "./Componants/NotFound/NotFound";
import PostDet from "./Page/PostDet/PostDet";
import Profile from "./Page/Profile/Profile";
import { ToastContainer } from "react-toastify";

const routs = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <InnversGard>
            <Home />
          </InnversGard>
        ),
      },
      {
        path: "/login",
        element: (
          <InnversGard>
            <Login />
          </InnversGard>
        ),
      },
      {
        path: "/register",
        element: (
          <InnversGard>
            <Register />
          </InnversGard>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/home",
        element: (
          <BodyGard>
            <MainHome />
          </BodyGard>
        ),
      },
      {
        path: "/profile",
        element: (
          <BodyGard>
            <Profile />
          </BodyGard>
        ),
      },
      {
        path: "/postDetails/:postId",
        element: (
          <BodyGard>
            <PostDet />
          </BodyGard>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routs} />
    </>
  );
}

export default App;
