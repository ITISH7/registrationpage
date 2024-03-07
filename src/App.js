import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/registerPage/RegisterPage";
function App() {
  const router = createBrowserRouter([
    // { path: "/register/:eventid/:category/:maxsize", element: <Register/> },
    { path: "/register", element: <Register/> },
    
    
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
