import {Card, Col, Row} from 'antd'
import React, {useEffect} from 'react'
import {DashboardFilled} from '@ant-design/icons'
import {Progress} from './Progress'
import { useCpuStore } from '../../store/cpu/CpuStore'

export const CpuState = () => {
  const info = useCpuStore(state => state.info)
  const infoLoading = useCpuStore(state => state.infoLoading)
  const fetchInfo = useCpuStore(state => state.fetchInfo)
  const cpuState = useCpuStore(state => state.data)
  const fetchCpu = useCpuStore(state => state.fetch)

  useEffect(() => {
    fetchCpu()

    const id = setInterval(() => {
      fetchCpu()
    }, 1000)

    return () => {clearInterval(id)}
  }, [fetchCpu])

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  const cpuInfo = info?.length && info.length > 0 && info[0] || null

  return (
    <Card
      size="small"
      title={(
        <>
          <DashboardFilled/>{' '}Cpu
        </>
      )}
      loading={infoLoading}
    >
      {cpuInfo && (
        <div style={{marginBottom: 12}}>
          {cpuInfo.modelName}
        </div>
      )}
      {cpuState ? (
        <>
          <Row gutter={[12, 0]}>
            {Object.keys(cpuState.average)
              .sort((first, second) => {
                const firstCoreNumber = Number(first.replace('cpu', ''))
                const secondCoreNumber = Number(second.replace('cpu', ''))

                if (firstCoreNumber > secondCoreNumber) {
                  return 1
                }
                if (firstCoreNumber < secondCoreNumber) {
                  return -1
                }

                return 0
              })
              .map(cpuName => {
                const isTotal = cpuName === 'cpu'
                const cpuNewName = isTotal ? 'Total' : cpuName.replace('cpu', 'Core ')

                return (
                  <Col key={cpuNewName} span={isTotal ? 24 : 12}>
                    <Progress key={`${cpuName}-progress`} percent={100 - cpuState.average[cpuName].idle} title={cpuNewName}/>
                  </Col>
                )
              }
              )}
          </Row>
        </>
      ) : (
        'Loading'
      )}
    </Card>
  )
}
