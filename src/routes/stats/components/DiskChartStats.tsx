import { Card, Select } from 'antd'
import { Area } from '@ant-design/plots'
import { useEffect } from 'react'
import bytes from 'bytes'
import {useDisksHistoryStore} from '../../../store/disks/DisksHistoryStore'

export const DiskChartStats = () => {
  const [diskList, loaded, selected, history, setSelected] =
    useDisksHistoryStore(state => [
      state.disks,
      state.loaded,
      state.selected,
      state.data,
      state.setSelected
    ])
  useEffect(() => {
    useDisksHistoryStore.getState().fetch()

    const id = setInterval(() => {
      useDisksHistoryStore.getState().tick()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <Card
      size={'small'}
      title={'Disks Read/Write'}
      extra={
        <Select
          loading={!loaded}
          style={{ width: 160 }}
          key={selected}
          defaultValue={selected}
          onChange={v => setSelected(v)}
          size={'small'}
          options={diskList.map(v => ({
            value: v,
            label: v
          }))}
        ></Select>
      }
    >
      <Area
        seriesField={'group'}
        loading={!loaded}
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
    </Card>
  )
}
