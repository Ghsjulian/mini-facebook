import React from "react";
import { BrowserRouter, createBrowserRouter ,RouterProvider, Routes, Route } from "react-router-dom";
import MyRoutes from "./Router";
import {AuthProvider} from "./auth/Auth"
import {SocketProvider} from "./socket/SocketProvider"

const router = createBrowserRouter(MyRoutes);
const App = () => {
    return <AuthProvider>
    <SocketProvider>
    <RouterProvider router={router} />
    </SocketProvider>
    </AuthProvider>;
};

export default App;