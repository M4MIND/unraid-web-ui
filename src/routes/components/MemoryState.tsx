import { Card } from 'antd'
import React from 'react'
import { LineChartOutlined } from '@ant-design/icons'

import { Progress } from './Progress'
import { useMemoryStore } from '../../store/memory/MemoryStore'

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
        <Progress title={'Real free'} percent={(realfree / memtotal) * 100} />
        <Progress title={'Free'} percent={(memfree / memtotal) * 100} />
        <Progress title={'Cached'} percent={(cached / memtotal) * 100} />
        <Progress title={'Buffer'} percent={(buffers / memtotal) * 100} />
      </>
    )
  }

  return (
    <Card size={'small'} title="Memory" extra={<LineChartOutlined />}>
      {content}
    </Card>
  )
}
