import { Card } from 'antd'
import { useEffect } from 'react'
import { Area } from '@ant-design/plots'
import { useCpuStatsHistory } from '../../../store/cpu/CpuStatsHistory'
import {ChartThemes} from '../../../components/charts/chart.theme'

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
    <Card size={'small'} loading={!loaded} title={'CPU'}>
      <Area
        animation={false}
        yField={'value'}
        xField={'date'}
        isStack={false}
        yAxis={{ max: 100, min: 0 }}
        seriesField={'group'}
        renderer={'canvas'}
        theme={ChartThemes.dark}
        data={history}
      ></Area>
    </Card>
  )
}
