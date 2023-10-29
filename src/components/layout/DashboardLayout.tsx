import { Menu, Layout } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import {
  AppstoreFilled,
  AreaChartOutlined,
  DashboardFilled,
  DatabaseFilled,
  FolderFilled,
  HddFilled,
  ProfileFilled,
  SettingFilled,
} from "@ant-design/icons";
import { NavLink, RouterProvider } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import routes from "../../routes/router";
import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AppsIcon from "@mui/icons-material/Apps";
import StorageIcon from "@mui/icons-material/Storage";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";

const { Header } = Layout;
export default function DashboardLayout(props: React.PropsWithChildren) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0 }}>
        <Menu mode={"horizontal"}>
          <MenuItem key={"/"} icon={<DashboardIcon />}>
            <NavLink to={"/"}>Dashboard</NavLink>
          </MenuItem>
          <MenuItem icon={<StorageIcon />}>Main</MenuItem>
          <MenuItem icon={<FolderIcon />}>Shares</MenuItem>
          <MenuItem icon={<PersonIcon />}>Users</MenuItem>
          <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
          <MenuItem icon={<AppsIcon />}>
            <NavLink to={"/docker"}>Docker</NavLink>
          </MenuItem>
          <MenuItem icon={<PersonalVideoIcon />}>VMs</MenuItem>
          <MenuItem icon={<BarChartIcon />}>
            <NavLink to={"/stats"}>Stats</NavLink>
          </MenuItem>
        </Menu>
      </Header>
      <Content
        style={{
          padding: "0 24px",
          margin: "0 auto",
          maxWidth: 1600,
          width: "100%",
        }}
      >
        {/* <Breadcrumb style={{ margin: "24px 0 12px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
        <Layout style={{ padding: "24px 0" }}>
          <Content>{props.children}</Content>
        </Layout>
      </Content>
    </Layout>
  );
}
