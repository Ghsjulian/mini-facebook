import Layouts from "./layouts/Layouts";
import NotFound from "./components/404";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AddFriends from "./components/AddFriends";
import { Protect,LoginProtect } from "./auth/Auth";

const MyRoutes = [
    {
        path: "/",
        element: (
            <Protect>
                <Layouts />
            </Protect>
        ),
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/add-friends",
                element: <AddFriends />
            }
        ]
    },
    {
        path: "/login",
        element: (
            <LoginProtect>
                <Login />
            </LoginProtect>
        )
    },
    {
        path: "/signup",
        element: (
            <LoginProtect>
                <Signup />
            </LoginProtect>
        )
    },
    {
        path: "*",
        element: <NotFound />
    }
];

export default MyRoutes;

/* Importing All Routes And Components Here...*/
/*
import Layouts from "./layouts/Layouts";
import NotFound from "./components/404";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AddFriends from "./components/AddFriends";

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
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/add-friends",
                element: <AddFriends />
            }
        ]
    },

    {
        path: "/login",
        element: <Login /> //<LoginProtect><Login /></LoginProtect>
    },
    {
        path: "/signup",
        element: <Signup /> // <LoginProtect><Signup /></LoginProtect>
    },

    {
        path: "*",
        element: <NotFound />
    }
];

export default MyRoutes;
*/
