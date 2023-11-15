import { Card } from 'antd'
import { useEffect } from 'react'
import { Area } from '@ant-design/plots'
import { useCpuStatsHistory } from '../../../store/cpu/CpuStatsHistory'
import {ChartThemes} from '../../../components/charts/chart.theme'

export const CpuChartStats = () => {
  const [history, loading] = useCpuStatsHistory(state => [
    state.data,
    state.loading
  ])

  useEffect(() => {
    useCpuStatsHistory.getState().subscribe()

    return () => {
      useCpuStatsHistory.getState().unsubscribe()
    }
  }, [])

  return (
    <Card size={'small'} loading={loading} title={'CPU'}>
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
