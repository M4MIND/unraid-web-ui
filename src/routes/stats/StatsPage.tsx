import React from 'react'
import { Col, Row } from 'antd'
import { MemoryChartStats } from './components/MemoryChartStats'
import { CpuChartStats } from './components/CpuChartStats'
import { DiskChartStats } from './components/DiskChartStats'
import { NetworkChartStats } from './components/NetworkChartStats'

export function StatsPage() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <CpuChartStats></CpuChartStats>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <MemoryChartStats></MemoryChartStats>
        </Col>
        <Col xs={12} sm={24} md={12}>
          <DiskChartStats />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <NetworkChartStats></NetworkChartStats>
        </Col>
      </Row>
    </div>
  )
}
