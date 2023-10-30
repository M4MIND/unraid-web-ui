import DashboardLayout from "../../components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select } from "antd";
import { Area } from "@ant-design/plots";
import useCpuStatsHistory from "../../store/system/info/cpu/CpuStatsHistory";
import useMemoryHistoryStore from "../../store/system/info/memory/MemoryHistoryStore";
import useNetworkHistoryStore from "../../store/system/info/network/NetworkHistoryStore";
import bytes from "bytes";

export function StatsPage() {
  const cpuStatsHistory = useCpuStatsHistory((state) => state.data);
  const memoryStatsHistory = useMemoryHistoryStore((state) => state.data);
  const networkHistory = useNetworkHistoryStore((state) => state.data);
  const networkInterfaces = useNetworkHistoryStore((state) => state.interfaces);
  const interfaceSelected = useNetworkHistoryStore((state) => state.selected);
  const changeInterface = useNetworkHistoryStore(
    (state) => state.changeSelected,
  );

  useEffect(() => {
    useCpuStatsHistory.getState().fetch();
    useMemoryHistoryStore.getState().fetch();
    useNetworkHistoryStore.getState().fetch();

    const id = setInterval(() => {
      useCpuStatsHistory.getState().fetch();
      useMemoryHistoryStore.getState().fetch();
      useNetworkHistoryStore.getState().fetch();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <DashboardLayout>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Card size={"small"} title={"CPU"}>
            <Area
              animation={false}
              yField={"value"}
              xField={"date"}
              isStack={false}
              xAxis={{
                label: {
                  formatter: (v) => {
                    const date = new Date(parseInt(v));
                    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                  },
                },
              }}
              yAxis={{ max: 100, min: 0 }}
              seriesField={"group"}
              renderer={"canvas"}
              data={
                cpuStatsHistory
                  ?.filter((v) => v !== null)
                  .map((v, k) => {
                    const date =
                      Date.now() - (cpuStatsHistory?.length * 1000 - k * 1000);
                    return [
                      {
                        value: Number((100 - v["cpu"].idle).toFixed(2)),
                        date: date,
                        group: "used",
                      },
                      {
                        value: Number(v["cpu"].system.toFixed(2)),
                        date: date,
                        group: "system",
                      },
                      {
                        value: Number(v["cpu"].user.toFixed(2)),
                        date: date,
                        group: "user",
                      },
                    ];
                  })
                  .flat() ?? []
              }
            ></Area>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card size={"small"} title={"Memory"}>
            <Area
              animation={false}
              xField={"date"}
              yField={"value"}
              seriesField={"group"}
              isStack={false}
              renderer={"canvas"}
              yAxis={{
                label: {
                  formatter: (v) => {
                    return `${Number(v).toFixed(2)}%`;
                  },
                },
              }}
              xAxis={{
                label: {
                  formatter: (v) => {
                    const date = new Date(parseInt(v));
                    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                  },
                },
              }}
              data={memoryStatsHistory
                .filter((v) => v !== null)
                .map((v, k) => {
                  const date =
                    Date.now() - (cpuStatsHistory?.length * 1000 - k * 1000);
                  return [
                    {
                      value: (v.realfree / v.memtotal) * 100,
                      date: date,
                      group: "free",
                    },
                    {
                      value: (v.cached / v.memtotal) * 100,
                      date: date,
                      group: "cached",
                    },
                    {
                      value: (v.buffers / v.memtotal) * 100,
                      date: date,
                      group: "buffer",
                    },
                  ];
                })
                .flat()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card
            size={"small"}
            title={"Network"}
            extra={
              networkHistory[0] !== undefined ? (
                <Select
                  size={"small"}
                  style={{ width: 120 }}
                  onChange={changeInterface}
                  defaultValue={interfaceSelected}
                  options={networkInterfaces.map((v) => {
                    return {
                      label: v,
                      value: v,
                    };
                  })}
                ></Select>
              ) : (
                <Select
                  style={{ width: 120 }}
                  size={"small"}
                  loading={true}
                ></Select>
              )
            }
          >
            <Area
              animation={false}
              xField={"date"}
              yField={"value"}
              seriesField={"group"}
              xAxis={{
                label: {
                  formatter: (v) => {
                    const date = new Date(parseInt(v));
                    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                  },
                },
              }}
              yAxis={{
                label: {
                  formatter: (v) => {
                    return bytes(Number(v));
                  },
                },
              }}
              data={networkHistory
                .map((time, k) => {
                  const date =
                    Date.now() - (networkHistory?.length * 1000 - k * 1000);
                  return [
                    {
                      value: time[interfaceSelected].rxbytes,
                      date: date,
                      group: "rxbytes",
                    },
                    {
                      value: -time[interfaceSelected].txbytes,
                      date: date,
                      group: "txbytes",
                    },
                  ];
                })
                .flat()}
            ></Area>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
