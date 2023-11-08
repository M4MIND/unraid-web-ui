import {
  Button,
  Card,
  Col,
  Divider,
  message,
  Row,
  Space,
  Statistic,
  Table
} from 'antd'
import { CpuState } from './components/CpuState'
import { MemoryState } from './components/MemoryState'
import React, { useEffect } from 'react'
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons'
import CachedIcon from '@mui/icons-material/Cached'

import bytes from 'bytes'
import { Api } from '../api/api'
import { useCpuStore } from '../store/cpu/CpuStore'
import { useMemoryStore } from '../store/memory/MemoryStore'
import { useDockerContainersStore } from '../store/docker/DockerContainers'
import MemoryIcon from '@mui/icons-material/Memory'

export const DashboardPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const cpuState = useCpuStore(state => state.data)

  const memory = useMemoryStore(state => state.data)
  const fetchMemory = useMemoryStore(state => state.fetch)

  const containers = useDockerContainersStore(state => state.data)
  const fetchContainers = useDockerContainersStore(state => state.fetch)

  useEffect(() => {
    fetchMemory()
    fetchContainers()

    const id = setInterval(() => {
      fetchMemory()
      fetchContainers()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [fetchContainers, fetchMemory])

  const cpuLoad = cpuState?.average['cpu'].total ?? 0
  const memoryFree =
    memory && memory.stats ? bytes(memory.stats.realfree * 1024) : 0

  return (
    <div>
      {contextHolder}
      <Row gutter={[12, 12]}>
        <Col xs={8} sm={6} md={4} key="cpu-col">
          <Card size={'small'}>
            <Statistic
              key={'cpu-statistic'}
              precision={2}
              value={cpuLoad}
              suffix={'%'}
              title={'CPU'}
            />
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={'small'}>
            <Statistic
              key={'memory-statistic'}
              value={memoryFree}
              title={'Memory real free'}
            />
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={'small'}>
            <Statistic title={'Stoped VMs'}></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={'small'}>
            <Statistic
              prefix={<PlayCircleOutlined />}
              title="Running containers"
              value={containers?.filter(v => v.State === 'running').length}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={'small'}>
            <Statistic
              prefix={<CachedIcon />}
              title="Restarting containers"
              value={containers?.filter(v => v.State === 'restarting').length}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={'small'}>
            <Statistic
              prefix={<StopOutlined />}
              title="Stoped containers"
              value={containers?.filter(v => v.State === 'exited').length}
            ></Statistic>
          </Card>
        </Col>
      </Row>
      <Divider></Divider>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={8}>
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <CpuState/>
            </Col>
            <Col xs={24}>
              <MemoryState></MemoryState>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Card size={'small'} title={'Docker containers'}>
            {containers ? (
              <Table
                size={'small'}
                dataSource={containers ?? []}
                columns={[
                  { title: 'Name', dataIndex: 'Names', key: 'Names' },
                  { title: 'Status', dataIndex: 'Status', key: 'Status' },
                  { title: 'State', dataIndex: 'State', key: 'State' },
                  {
                    title: 'Actions',
                    render: value => (
                      <Space wrap>
                        {value.State === 'exited' ? (
                          <Button
                            type={'primary'}
                            size={'small'}
                            onClick={() => {
                              void messageApi.loading('Starting container...')
                              Api.docker
                                .updateContainer(value.id)
                                .then(() => {
                                  messageApi.destroy()
                                  void messageApi.success('Container started')
                                })
                                .catch(() => {
                                  messageApi.destroy()
                                  void messageApi.error(
                                    'Failed to start container'
                                  )
                                })
                            }}
                          >
                            Start
                          </Button>
                        ) : (
                          ''
                        )}

                        {value.State === 'running' ? (
                          <Button type={'primary'} size={'small'}>
                            Restart
                          </Button>
                        ) : (
                          ''
                        )}
                        {value.State === 'running' ||
                        value.State === 'restarting' ? (
                            <Button
                              type={'primary'}
                              size={'small'}
                              onClick={() => {
                                messageApi.loading('Starting container...')
                                Api.docker.updateContainer(value.id).then(() => {
                                  messageApi.destroy()
                                  messageApi.info('Container stopped')
                                })
                              }}
                            >
                            Stop
                            </Button>
                          ) : (
                            ''
                          )}
                      </Space>
                    )
                  }
                ]}
              ></Table>
            ) : (
              'Loading'
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
