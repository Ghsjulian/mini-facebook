/* Importing All Routes And Components Here...*/
import Layouts from "./layouts/Layouts";
import { Protect } from "./auth/Auth";
import NotFound from "./components/404";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AddFriends from "./components/AddFriends"

const MyRoutes = [
    {
        path: "/",
        element: (
                <Layouts />
        ),
        children: [
            {
                index: true,
                element: (
                        <Home />
                )
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
        element:<Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },

    {
        path: "*",
        element: <NotFound />
    }
];

export default MyRoutes;
