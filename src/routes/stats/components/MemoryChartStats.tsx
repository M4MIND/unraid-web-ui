import { Card } from 'antd'
import { Area } from '@ant-design/plots'
import { useEffect } from 'react'
import { useMemoryHistoryStore } from '../../../store/memory/MemoryHistoryStore'
import bytes from 'bytes'
import {ChartThemes} from '../../../components/charts/chart.theme'

export const MemoryChartStats = () => {
  const [history] = useMemoryHistoryStore(state => [state.data])
  useEffect(() => {
    useMemoryHistoryStore.getState().fetch()
    const id = setInterval(() => {
      useMemoryHistoryStore.getState().tick()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <Card size={'small'} title={'Memory'}>
      <Area
        animation={false}
        xField={'date'}
        seriesField={'group'}
        yField={'value'}
        isStack={false}
        theme={ChartThemes.dark}
        yAxis={{
          label: {
            formatter: v => bytes(Number(v) * 1024)
          }
        }}
        data={history}
      ></Area>
    </Card>
  )
}
