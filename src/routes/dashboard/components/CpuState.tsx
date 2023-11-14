import {Card, Col, Row} from 'antd'
import React, {useEffect} from 'react'

import {Progress} from './Progress'
import {useCpuStore} from '../../../store/cpu/CpuStore'
import {DataUsage } from '@mui/icons-material'

export const CpuState = () => {
  const info = useCpuStore(state => state.info)
  const infoLoading = useCpuStore(state => state.infoLoading)
  const fetchInfo = useCpuStore(state => state.fetchInfo)
  const cpuState = useCpuStore(state => state.data)

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  const cpuInfo = info?.length && info.length > 0 && info[0] || null

  return (
    <Card
      size="small"
      title={'CPU'}
      loading={infoLoading}
      extra={<DataUsage style={{fontSize: '18px', marginTop: '6px'}} />}
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
                const percent = 100 - cpuState.average[cpuName].idle

                return (
                  <Col key={cpuNewName} span={isTotal ? 24 : 12}>
                    <Progress color={percent >= 80 ? 'red' : percent >= 60 ? 'yellow' : undefined} key={`${cpuName}-progress`}
                      percent={percent} title={cpuNewName}/>
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
