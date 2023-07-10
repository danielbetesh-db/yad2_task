import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./routes/home";
import Attractions from "./routes/attractions";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/attractions/lat/:lat/long/:long",
    element: <Attractions />,
  },
]);
//
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
