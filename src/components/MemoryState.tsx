import { Card } from 'antd'
import React from 'react'
import { LineChartOutlined } from '@ant-design/icons'

import { Progress } from './stats/Progress'
import {useMemoryStore} from '../store/system/info/memory/MemoryStore'

export const MemoryState = () => {
  const memoryStore = useMemoryStore(state => state.data)

  const stats = memoryStore?.stats

  let content: React.ReactNode
  if (!stats) {
    content = 'Loading'
  } else {
    const {realfree, cached, buffers, memtotal} = stats
    content = (
      <>
        <Progress
          title={'Free'}
          percent={(realfree / memtotal) * 100}
        />
        <Progress
          percent={(cached / memtotal) * 100}
          title={'Cached'}
        />
        <Progress
          percent={(buffers / memtotal) * 100}
          title={'Buffer'}
        />
      </>
    )
  }

  return (
    <Card size={'small'} title="Memory" extra={<LineChartOutlined />}>
      {content}
    </Card>
  )
}
