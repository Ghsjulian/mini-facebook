import React from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route
} from "react-router-dom";
import MyRoutes from "./Router";

const router = createBrowserRouter(MyRoutes);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
