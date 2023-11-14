import {
  Card,
  Col,
  message,
  Progress,
  Row,
  Statistic,
  Tag
} from 'antd'
import { CpuState } from './components/CpuState'
import { MemoryState } from './components/MemoryState'
import { JSX, useEffect } from 'react'
import {
  PlayCircleOutlined,
  StopOutlined
} from '@ant-design/icons'
import CachedIcon from '@mui/icons-material/Cached'

import bytes from 'bytes'
import { useCpuStore } from '../../store/cpu/CpuStore'
import { useMemoryStore } from '../../store/memory/MemoryStore'
import { useDockerContainersStore } from '../../store/docker/DockerContainers'
import { DockerContainers } from './components/DockerContainers'
import { useDisksArrayStore } from '../../store/disks/DisksArrayStore'

import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import {WebsocketTopics} from '../../websocket/WebsocketTopics'

export const DashboardPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const cpuState = useCpuStore(state => state.data)

  const memory = useMemoryStore(state => state.data)

  const containers = useDockerContainersStore(state => state.data)

  const [arrayInfoData, arrayInfoIsLoading] =
    useDisksArrayStore(state => [state.data, state.loading])

  const cpuLoad = cpuState?.average['cpu'].total ?? 0
  const memoryFree =
    memory && memory.stats ? bytes(memory.stats.realfree * 1024) : 0

  const isHdd: { [index: number]: JSX.Element } = {
    1: (
      <Tag color={'green'} style={{ margin: 0 }}>
        HDD
      </Tag>
    ),
    0: (
      <Tag color={'blue'} style={{ margin: 0 }}>
        SSD
      </Tag>
    )
  }

  return (
    <div>
      {contextHolder}
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={24} xl={12} xxl={8}>
          <Row gutter={[12, 12]}>
            <Col xs={8} sm={6} md={8} key="cpu-col">
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
            <Col xs={8} sm={6} md={8}>
              <Card size={'small'}>
                <Statistic
                  key={'memory-statistic'}
                  value={memoryFree}
                  title={'Memory real free'}
                />
              </Card>
            </Col>
            <Col xs={8} sm={6} md={8}>
              <Card size={'small'}>
                <Statistic title={'Stoped VMs'}></Statistic>
              </Card>
            </Col>

            <Col xs={24}>
              <CpuState />
            </Col>
            <Col xs={24}>
              <MemoryState></MemoryState>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} xl={12} xxl={8}>
          <Row gutter={[12, 12]}>
            <Col xs={8} sm={6} md={8} key="array-size">
              <Card size={'small'}>
                <Statistic
                  loading={arrayInfoIsLoading}
                  key={'array-size'}
                  precision={0}
                  value={bytes(arrayInfoData?.Size ?? 0)}
                  title={'Array size'}
                />
              </Card>
            </Col>
            <Col xs={8} sm={6} md={8} key="array-free">
              <Card size={'small'}>
                <Statistic
                  loading={arrayInfoIsLoading}
                  key={'array-free'}
                  precision={0}
                  value={bytes(arrayInfoData?.Free ?? 0)}
                  title={'Array Free'}
                />
              </Card>
            </Col>
            <Col xs={8} sm={6} md={8} key="array-used">
              <Card size={'small'}>
                <Statistic
                  loading={arrayInfoIsLoading}
                  key={'array-used'}
                  precision={0}
                  value={bytes(arrayInfoData?.Used ?? 0)}
                  title={'Array used'}
                />
              </Card>
            </Col>
            <Col xs={24}>
              <Row gutter={[12, 12]}>
                {(arrayInfoData?.Devices ?? []).map(v => (
                  <Col xs={24} key={v.RdevName}>
                    <Card
                      size={'small'}
                      title={`${v.DiskId} (${v.RdevName})`}
                      extra={isHdd[Number(v.IsHdd)]}
                    >
                      <Row gutter={[12, 0]}>
                        <Col flex={'1 1'}>
                          <Progress
                            size={'small'}
                            percent={v.DiskUsedPercent}
                            strokeColor={v.DiskUsedPercent > 60 ? 'yellow' : v.DiskUsedPercent > 75 ? 'red' : undefined}
                            showInfo={false}
                          ></Progress>
                        </Col>
                        <Col flex={'0 1'}>
                          {v.DiskUsedPercent.toFixed(1)}%
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={8}>
                          <Statistic
                            title={'Size'}
                            value={bytes(v.DiskSizeBytes)}
                          ></Statistic>
                        </Col>
                        <Col xs={8}>
                          <Statistic
                            title={'Used'}
                            value={bytes(v.DiskUsedBytes)}
                          ></Statistic>
                        </Col>
                        <Col xs={8}>
                          <Statistic
                            prefix={<DeviceThermostatIcon />}
                            suffix={'℃'}
                            title={'Temperature'}
                            value={v.Temperature}
                          ></Statistic>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} xl={12} xxl={8}>
          <Row gutter={[12, 12]}>
            <Col xs={8} sm={6} md={8}>
              <Card size={'small'}>
                <Statistic
                  prefix={<PlayCircleOutlined />}
                  title="Running containers"
                  value={
                    containers?.filter(v => v.State === 'running').length
                  }
                ></Statistic>
              </Card>
            </Col>
            <Col xs={8} sm={6} md={8}>
              <Card size={'small'}>
                <Statistic
                  prefix={<CachedIcon />}
                  title="Restarting containers"
                  value={
                    containers?.filter(v => v.State === 'restarting').length
                  }
                ></Statistic>
              </Card>
            </Col>
            <Col xs={8} sm={6} md={8}>
              <Card size={'small'}>
                <Statistic
                  prefix={<StopOutlined />}
                  title="Stoped containers"
                  value={containers?.filter(v => v.State === 'exited').length}
                ></Statistic>
              </Card>
            </Col>
            <Col xs={24}>
              <DockerContainers></DockerContainers>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
