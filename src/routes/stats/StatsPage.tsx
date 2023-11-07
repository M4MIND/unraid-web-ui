import React, { useEffect } from 'react'
import { Card, Col, Row } from 'antd'
import { Area } from '@ant-design/plots'
import {UtilDate} from '../../utils/UtilDate'
import {useMemoryHistoryStore} from '../../store/system/info/memory/MemoryHistoryStore'
import {useNetworkHistoryStore} from '../../store/system/info/network/NetworkHistoryStore'
import {DiskChartStats} from './components/DiskChartStats'
import {CpuChartStats} from './components/CpuChartStats'
import {useCpuStatsHistory} from '../../store/system/info/cpu/CpuStatsHistory'

export function StatsPage() {
  const memoryStatsHistory = useMemoryHistoryStore(state => state.data)
  // const [disksStatsHistory, disksList, diskSelected, setSelectedDisk] =
  //   useDisksHistoryStore((state) => [
  //     state.data,
  //     state.disks,
  //     state.selected,
  //     state.setSelected,
  //   ]);
  const networkHistory = useNetworkHistoryStore(state => state.data)
  const networkInterfaces = useNetworkHistoryStore(state => state.interfaces)
  const interfaceSelected = useNetworkHistoryStore(state => state.selected)

  const cpuStatsHistory = useCpuStatsHistory(state => state.data)

  const changeInterface = useNetworkHistoryStore(
    state => state.changeSelected
  )

  useEffect(() => {
    useMemoryHistoryStore.getState().fetch()
    useNetworkHistoryStore.getState().fetch()

    const id = setInterval(() => {
      useMemoryHistoryStore.getState().fetch()
      useNetworkHistoryStore.getState().fetch()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={24} md={12}>
          <DiskChartStats />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <CpuChartStats></CpuChartStats>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card size={'small'} title={'Memory'}>
            <Area
              animation={false}
              xField={'date'}
              yField={'value'}
              seriesField={'group'}
              isStack={false}
              renderer={'canvas'}
              yAxis={{
                label: {
                  formatter: v => `${Number(v).toFixed(2)}%`
                }
              }}
              xAxis={{
                label: {
                  formatter: v => UtilDate.ConvertUtcToHMS(v)
                }
              }}
              data={memoryStatsHistory
                .filter(v => v !== null)
                .map((v, k) => {
                  const date =
                    Date.now() - (cpuStatsHistory?.length * 1000 - k * 1000)

                  return [
                    {
                      value: (v.stats.realfree / v.stats.memtotal) * 100,
                      date,
                      group: 'free'
                    },
                    {
                      value: (v.stats.cached / v.stats.memtotal) * 100,
                      date,
                      group: 'cached'
                    },
                    {
                      value: (v.stats.buffers / v.stats.memtotal) * 100,
                      date,
                      group: 'buffer'
                    }
                  ]
                })
                .flat()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          {/* <Card*/}
          {/*  size={"small"}*/}
          {/*  title={"Network"}*/}
          {/*  extra={*/}
          {/*    networkHistory[0] !== undefined ? (*/}
          {/*      <Select*/}
          {/*        size={"small"}*/}
          {/*        style={{ width: 120 }}*/}
          {/*        onChange={changeInterface}*/}
          {/*        defaultValue={interfaceSelected}*/}
          {/*        options={networkInterfaces.map((v) => {*/}
          {/*          return {*/}
          {/*            label: v,*/}
          {/*            value: v,*/}
          {/*          };*/}
          {/*        })}*/}
          {/*      ></Select>*/}
          {/*    ) : (*/}
          {/*      <Select*/}
          {/*        style={{ width: 120 }}*/}
          {/*        size={"small"}*/}
          {/*        loading={true}*/}
          {/*      ></Select>*/}
          {/*    )*/}
          {/*  }*/}
          {/* >*/}
          {/*  <Area*/}
          {/*    animation={false}*/}
          {/*    xField={"date"}*/}
          {/*    yField={"value"}*/}
          {/*    seriesField={"group"}*/}
          {/*    xAxis={{*/}
          {/*      label: {*/}
          {/*        formatter: (v) => {*/}
          {/*          const date = new Date(parseInt(v));*/}
          {/*          return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;*/}
          {/*        },*/}
          {/*      },*/}
          {/*    }}*/}
          {/*    yAxis={{*/}
          {/*      label: {*/}
          {/*        formatter: (v) => {*/}
          {/*          return bytes(Number(v));*/}
          {/*        },*/}
          {/*      },*/}
          {/*    }}*/}
          {/*    data={networkHistory*/}
          {/*      .map((time, k) => {*/}
          {/*        const date =*/}
          {/*          Date.now() - (networkHistory?.length * 1000 - k * 1000);*/}
          {/*        return [*/}
          {/*          {*/}
          {/*            value: time[interfaceSelected].rxbytes,*/}
          {/*            date: date,*/}
          {/*            group: "rxbytes",*/}
          {/*          },*/}
          {/*          {*/}
          {/*            value: -time[interfaceSelected].txbytes,*/}
          {/*            date: date,*/}
          {/*            group: "txbytes",*/}
          {/*          },*/}
          {/*        ];*/}
          {/*      })*/}
          {/*      .flat()}*/}
          {/*  ></Area>*/}
          {/* </Card>*/}
        </Col>
      </Row>
    </div>
  )
}
