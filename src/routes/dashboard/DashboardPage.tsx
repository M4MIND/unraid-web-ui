import {
  Button,
  Card,
  Col,
  Divider,
  message, Progress,
  Row,
  Space,
  Statistic,
  Table
} from 'antd'
import {CpuState} from './components/CpuState'
import {MemoryState} from './components/MemoryState'
import React, {useEffect} from 'react'
import {PlayCircleOutlined, StopOutlined} from '@ant-design/icons'
import CachedIcon from '@mui/icons-material/Cached'

import bytes from 'bytes'
import {Api} from '../../api/api'
import {useCpuStore} from '../../store/cpu/CpuStore'
import {useMemoryStore} from '../../store/memory/MemoryStore'
import {useDockerContainersStore} from '../../store/docker/DockerContainers'
import {DockerContainers} from './components/DockerContainers'
import StorageIcon from '@mui/icons-material/Storage'
import {useDiskUsageStore} from '../../store/disks/DisksUsageStore'
import {useRaidInfo} from '../../store/raid/RaidInfoStore'

export const DashboardPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const cpuState = useCpuStore(state => state.data)

  const memory = useMemoryStore(state => state.data)
  const fetchMemory = useMemoryStore(state => state.fetch)

  const containers = useDockerContainersStore(state => state.data)
  const fetchContainers = useDockerContainersStore(state => state.fetch)

  // const [diskUsageFetch, diskUsage, diskUsageIsLoading] = useDiskUsageStore(state => [state.fetch, state.data, state.loading])

  const [raidInfoFetch, raidInfoData, raidInfoIsLoading, raidArraySize, raidArrayUsed] = useRaidInfo(state => [state.fetch, state.data, state.loading, state.arraySize, state.arrayUsed])

  useEffect(() => {
    fetchMemory()
    fetchContainers()
    // diskUsageFetch()
    raidInfoFetch()

    const id = setInterval(() => {
      fetchMemory()
      fetchContainers()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [fetchContainers, fetchMemory, raidInfoFetch])

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
              loading={raidInfoIsLoading}
              key={'array-size'}
              precision={0}
              value={bytes(raidArraySize)}
              title={'Array size'}
            />
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4} key="cpu-col">
          <Card size={'small'}>
            <Statistic
              loading={raidInfoIsLoading}
              key={'array-size'}
              precision={0}
              value={bytes(raidArrayUsed)}
              title={'Array used'}
            />
          </Card>
        </Col>
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
              prefix={<PlayCircleOutlined/>}
              title="Running containers"
              value={containers?.filter(v => v.State === 'running').length}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={'small'}>
            <Statistic
              prefix={<CachedIcon/>}
              title="Restarting containers"
              value={containers?.filter(v => v.State === 'restarting').length}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={'small'}>
            <Statistic
              prefix={<StopOutlined/>}
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
          <Row gutter={12}>
            <Col xs={12}><DockerContainers></DockerContainers></Col>
            <Col xs={12}>
              <Card loading={raidInfoIsLoading} extra={<StorageIcon style={{fontSize: '18px', marginTop: '6px'}}/>} size={'small'}
                title={'Array'}>
                <Table size={'small'} columns={[{
                  title: 'Model',
                  key: 'model',
                  dataIndex: 'model'
                },
                {title: 'Size', key: 'size', dataIndex: 'size', render: (v => bytes(v))},
                {title: 'Used', key: 'used', dataIndex: 'used', render: (v => bytes(v))},
                {title: 'Name', key: 'name', dataIndex: 'name'},
                {title: 'Path', key: 'mount', dataIndex: 'mount'},
                {title: 'Utilization', key: 'utilization', dataIndex: 'utilization', render: v => <Progress showInfo={false} percent={v}></Progress>}
                ]} dataSource={raidInfoData}></Table>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
