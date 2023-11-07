import './App.css'
import {ConfigProvider, theme} from 'antd'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes/router'

export const App = () => (
  <ConfigProvider
    theme={{
      algorithm: [theme.darkAlgorithm],
      token: {
        borderRadius: 4
      }
    }}
  >
    <RouterProvider router={routes}></RouterProvider>
  </ConfigProvider>
)
