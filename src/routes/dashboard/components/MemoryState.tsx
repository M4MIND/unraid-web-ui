import {Card, Col, Row, Statistic} from 'antd'
import React from 'react'
import { LineChartOutlined } from '@ant-design/icons'

import { Progress } from './Progress'
import { useMemoryStore } from '../../../store/memory/MemoryStore'
import bytes from 'bytes'

export const MemoryState = () => {
  const memoryStore = useMemoryStore(state => state.data)

  const stats = memoryStore?.stats

  let content: React.ReactNode
  if (!stats) {
    content = 'Loading'
  } else {
    const { realfree, cached, buffers, memtotal, memfree } = stats
    content = (
      <>
        <Row gutter={[12,8]}>
          <Col xs={8}>
            <Statistic title={'Total Memory'} value={bytes(memtotal * 1024)}></Statistic>
          </Col>
          <Col xs={8}>
            <Statistic title={'Free memory'} value={bytes(memfree * 1024)}></Statistic>
          </Col>
          <Col xs={8}>
            <Statistic title={'Cached memory'} value={bytes(cached * 1024)}></Statistic>
          </Col>
          <Col xs={12}>
            <Progress
              key={'real-free-memory'}
              title={'Real free'}
              percent={(realfree / memtotal) * 100}
            />
          </Col>
          <Col xs={12}>
            <Progress key={'free-memory'} title={'Free'} percent={(memfree / memtotal) * 100} />
          </Col>
          <Col xs={12}>
            <Progress
              key={'cached-memory'}
              percent={(cached / memtotal) * 100}
              title={'Cached'}
            />
          </Col>
          <Col xs={12}>
            <Progress
              key={'buffer-memory'}
              percent={(buffers / memtotal) * 100}
              title={'Buffer'}
            />
          </Col>
        </Row>
      </>
    )
  }

  return (
    <Card size={'small'} title="Memory" extra={<LineChartOutlined />}>
      {content}
    </Card>
  )
}
