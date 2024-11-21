import React from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route
} from "react-router-dom";
import MyRoutes from "./Router";
import { AuthProvider } from "./contexts/useAuth";
import { SocketContextProvider } from "./contexts/SocketContext";
import { MessageProvider } from "./contexts/MessageContext";

const router = createBrowserRouter(MyRoutes);
const App = () => {
    return (
        <AuthProvider>
             <SocketContextProvider>
             <MessageProvider>
            <RouterProvider router={router} />
            </MessageProvider>
            </SocketContextProvider>
        </AuthProvider>
    );
};

export default App;
