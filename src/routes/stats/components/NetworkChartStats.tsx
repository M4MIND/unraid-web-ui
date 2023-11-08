import {Card, Select} from 'antd'
import {Area} from '@ant-design/plots'
import {useEffect} from 'react'
import bytes from 'bytes'
import {useNetworkHistoryStore} from '../../../store/network/NetworkHistoryStore'
import {ChartThemes} from '../../../components/charts/chart.theme'

export const NetworkChartStats = () => {
  const [interfaces, selected, history, setSelected, loaded] =
        useNetworkHistoryStore(state => [
          state.interfaces,
          state.selected,
          state.data,
          state.changeSelected,
          state.loaded
        ])
  useEffect(() => {
    useNetworkHistoryStore.getState()
      .fetch()

    const id = setInterval(() => {
      useNetworkHistoryStore.getState()
        .fetchTick()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <Card
      size={'small'}
      loading={!loaded}
      title={'Network'}
      extra={
        <Select
          size={'small'}
          key={selected}
          loading={!loaded}
          defaultValue={selected}
          style={{width: 140}}
          onChange={v => setSelected(v)}
          options={interfaces.map(v => ({
            value: v,
            label: v
          }))}
        ></Select>
      }
    >
      {loaded ? (
        <Area
          theme={ChartThemes.dark}
          seriesField={'group'}
          key={selected}
          xField={'date'}
          yField={'value'}
          animation={false}
          yAxis={{
            label: {
              formatter: v => bytes(Number(v))
            }
          }}
          data={history[selected] ?? []}
        ></Area>
      ) : null}
    </Card>
  )
}
