import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import StorageIcon from '@mui/icons-material/Storage'
import FolderIcon from '@mui/icons-material/Folder'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import AppsIcon from '@mui/icons-material/Apps'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo'
import BarChartIcon from '@mui/icons-material/BarChart'
import {AppLayout} from '../components/layout/AppLayout'
import {DashboardPage} from './dashboard/DashboardPage'
import {StatsPage} from './stats/StatsPage'
import {DockerPage} from './docker/DockerPage'
import {MainPage} from './main/MainPage'

interface AppRoute {
  label: string;
  path: string;
  icon: React.ReactElement
  component?: React.ReactElement,
  index?: boolean
}

export const appRoutes: AppRoute[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon/>,
    component: <DashboardPage/>,
    index: true
  }, {
    label: 'Main',
    path: '/main',
    component: <MainPage/>,
    icon: <StorageIcon/>
  }, {
    label: 'Shares',
    path: '/shares',
    icon: <FolderIcon/>
  }, {
    label: 'Users',
    path: '/users',
    icon: <PersonIcon/>
  }, {
    label: 'Settings',
    path: '/settings',
    icon: <SettingsIcon/>
  }, {
    label: 'Docker',
    path: '/docker',
    icon: <AppsIcon/>,
    component: <DockerPage/>
  }, {
    label: 'VMs',
    path: '/vms',
    icon: <PersonalVideoIcon/>
  }, {
    label: 'Stats',
    path: '/stats',
    icon: <BarChartIcon/>,
    component: <StatsPage/>
  }
]

export const routes = createBrowserRouter([{
  element: <AppLayout />,
  path: '/',
  children: appRoutes.map(route => ({
    path: route.path,
    element: route.component,
    caseSensitive: false,
    index: route.index
  }))
}
])
