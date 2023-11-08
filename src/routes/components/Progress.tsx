import React from 'react'
import { Col, Row, Progress as AntProgress } from 'antd'

export function Progress(props: { percent: number; title: string }) {
  return (
    <Row>
      <Col span={12} style={{ textAlign: 'left' }}>
        <span>{props.title}</span>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <span>{props.percent.toFixed(1)}%</span>
      </Col>
      <Col span={24}>
        <AntProgress
          size={'small'}
          showInfo={false}
          percent={Number(props.percent.toFixed(1))}
        />
      </Col>
    </Row>
  )
}
