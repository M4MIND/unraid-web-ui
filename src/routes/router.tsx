import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import React from "react";
import DockerPage from "./docker/DockerPage";
import { StatsPage } from "./stats/StatsPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
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
