import React from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route
} from "react-router-dom";
import MyRoutes from "./Router";
import { AuthProvider } from "./contexts/useUserContext";
import { SocketContextProvider } from "./contexts/SocketContext";

const router = createBrowserRouter(MyRoutes);
const App = () => {
    return (
        <AuthProvider>
             <SocketContextProvider>
            <RouterProvider router={router} />
            </SocketContextProvider>
        </AuthProvider>
    );
};

export default App;
