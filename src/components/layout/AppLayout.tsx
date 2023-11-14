import {Menu, Layout} from 'antd'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {Content} from 'antd/es/layout/layout'
import {appRoutes} from '../../routes/router'
import React, {useEffect, useState} from 'react'

const {Header} = Layout

export const AppLayout = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      navigate('/dashboard')
    }
  }, [navigate, pathname])

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{padding: 0}}>
        <Menu
          mode={'horizontal'}
          selectedKeys={[pathname]}
          items={appRoutes.map(route => ({
            key: route.path,
            label: route.label,
            icon: route.icon,
            onClick: () => navigate(route.path)
          }))}>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 12px',
          margin: '0 auto',
          maxWidth: 1600,
          width: '100%'
        }}
      >
        <Layout style={{padding: '24px 0'}}>
          <Content>
            <Outlet/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
