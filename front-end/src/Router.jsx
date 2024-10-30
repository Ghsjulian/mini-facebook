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
            <Protect>
                <Layouts />
            </Protect>
        ),
        children: [
            {
                index: true,
                element: (
                    <Protect>
                        <Home />
                    </Protect>
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
        element: <Protect><Login /></Protect>
    },
    {
        path: "/signup",
        element: <Protect><Signup /></Protect>
    },

    {
        path: "*",
        element: <NotFound />
    }
];

export default MyRoutes;
