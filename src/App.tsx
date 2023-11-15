import './App.css'
import {ConfigProvider, theme} from 'antd'
import {RouterProvider} from 'react-router-dom'
import {routes} from './routes/router'

export const App = () => (
  <ConfigProvider
    theme={{
      algorithm: [theme.darkAlgorithm],
      token: {
        fontSize: 14,
        sizeStep: 4,
        sizeUnit: 4,
        borderRadius: 0,
        colorBgBase: '#060606'
      }
    }}
  >
    <RouterProvider router={routes}></RouterProvider>
  </ConfigProvider>
)
