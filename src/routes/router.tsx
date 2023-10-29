import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./paths/Dashboard";
import React from "react";
import DockerPage from "./paths/docker/DockerPage";
import { StatsPage } from "./paths/stats/StatsPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/docker",
    element: <DockerPage></DockerPage>,
  },
  {
    path: "/stats",
    element: <StatsPage></StatsPage>,
  },
]);

export default routes;
