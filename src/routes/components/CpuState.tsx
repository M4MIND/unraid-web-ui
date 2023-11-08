import { Card, Col, Row } from 'antd'
import React, {useEffect} from 'react'
import { DashboardFilled } from '@ant-design/icons'
import { Progress } from './Progress'
import { useCpuStore } from '../../store/cpu/CpuStore'

export const CpuState = () => {
  const cpuState = useCpuStore(state => state.data)
  const fetchCpu = useCpuStore(state => state.fetch)

  useEffect(() => {
    fetchCpu()

    const id = setInterval(() => {
      fetchCpu()
    }, 1000)

    return () => {clearInterval(id)}
  }, [fetchCpu])

  return (
    <Card
      size={'small'}
      extra={<DashboardFilled />}
      title={'CPU'}
      loading={!cpuState}
    >
      {cpuState ? (
        <Row gutter={[12, 0]}>
          {Object.keys(cpuState.average)
            .filter(v => v !== 'cpu')
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
            .map(v => (
              <Col key={v} span={12}>
                <Progress percent={100 - cpuState.average[v].idle} title={v} />
              </Col>
            ))}
        </Row>
      ) : (
        'Loading'
      )}
    </Card>
  )
}
