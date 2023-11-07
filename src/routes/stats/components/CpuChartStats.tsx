import { Card } from 'antd'
import { useEffect } from 'react'
import { Area } from '@ant-design/plots'
import {useCpuStatsHistory} from '../../../store/cpu/CpuStatsHistory'

export const CpuChartStats = () => {
  const [history, loaded] = useCpuStatsHistory(state => [
    state.data,
    state.loaded
  ])

  useEffect(() => {
    useCpuStatsHistory.getState().fetchAll()

    const id = setInterval(() => {
      useCpuStatsHistory.getState().fetchTick()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <Card size={'small'} title={'CPU'}>
      <Area
        animation={false}
        yField={'value'}
        xField={'date'}
        isStack={false}
        loading={!loaded}
        yAxis={{ max: 100, min: 0 }}
        seriesField={'group'}
        renderer={'canvas'}
        data={history}
      ></Area>
    </Card>
  )
}
