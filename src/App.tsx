import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { RouterProvider, Link, NavLink } from "react-router-dom";
import MenuItem from "antd/es/menu/MenuItem";
import { Content } from "antd/es/layout/layout";
import routes from "./routes/router";
import {
  AppstoreFilled,
  DashboardFilled,
  DatabaseFilled,
  FolderFilled,
  HddFilled,
  ProfileFilled,
  SettingFilled,
} from "@ant-design/icons";

const { Header } = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm],
        token: {
          borderRadius: 4,
        },
      }}
    >
      <RouterProvider router={routes}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;
