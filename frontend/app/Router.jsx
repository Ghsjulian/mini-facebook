import { Navigate } from "react-router-dom";

//import components and pages here...
import Layouts from "./layouts/Layouts";
import NotFound from "./components/404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddFriends from "./pages/AddFriends";
import ChatBox from "./pages/ChatBox"
// Import Auth Here...
import { isLogin } from "./auth/isLogin";
import IsLogged from "./auth/isLoggedIn";

const MyRoutes = [
    {
        path: "/",
        element: <Layouts />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/profile/:user_name/:user_id",
                element: <Profile />
            },
            {
                path: "/add-friend",
                element: <AddFriends />
            },
            
        ]
    },
    {
                path: "/chat-box/:user_name/:user_id",
                element: <ChatBox />
            },
    
    {
        path: "/login",
        element: !isLogin() ? <Login /> : <Navigate to="/" />
    },
    {
        path: "/signup",
        element: !isLogin() ? <Signup /> : <Navigate to="/" />
    },
    {
        path: "*",
        element: <NotFound />
    }
];
/*
const MyRoutes = [
    {
        path: "/",
        element: isLogin() ? <Layouts /> : <Navigate to="/login" />,
        children: [
            {
                index: true,
                element: isLogin() ?<Home />:<Navigate to="/login" />
            },
            {
                path: "/profile/:user_name/:user_id",
                element: isLogin() ? <Profile /> : <Navigate to="/login" />
            },
            {
                path: "/add-friend",
                element: isLogin() ? <AddFriends /> : <Navigate to="/login" />
            }
        ]
    },
    {
        path: "/login",
        element: !isLogin() ? <Login /> : <Navigate to="/" />
    },
    {
        path: "/signup",
        element: !isLogin() ? <Signup /> : <Navigate to="/" />
    },
    {
        path: "*",
        element: <NotFound />
    }
];
*/
export default MyRoutes;
