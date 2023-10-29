import DashboardLayout from "../../components/layout/DashboardLayout";
import React, { useEffect } from "react";
import { Card, Col, Row } from "antd";
import { Area, Line } from "@ant-design/plots";
import useCpuStatsHistory from "../../store/system/info/cpu/CpuStatsHistory";
import { blue, green, red } from "@ant-design/colors";

export function StatsPage() {
  const cpuStatsHistory = useCpuStatsHistory((state) => state.data);
  useEffect(() => {
    useCpuStatsHistory.getState().fetch();

    const id = setInterval(() => {
      useCpuStatsHistory.getState().fetch();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <DashboardLayout>
      <Row>
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
              data={
                cpuStatsHistory
                  ?.filter((v) => v !== null)
                  .map((v, k) => {
                    const date = Date.now();
                    return [
                      {
                        value: Number((100 - v["cpu"].idle).toFixed(2)),
                        date:
                          date - (cpuStatsHistory?.length * 1000 - k * 1000),
                        group: "used",
                      },
                      {
                        value: Number(v["cpu"].system.toFixed(2)),
                        date:
                          date - (cpuStatsHistory?.length * 1000 - k * 1000),
                        group: "system",
                      },
                      {
                        value: Number(v["cpu"].user.toFixed(2)),
                        date:
                          date - (cpuStatsHistory?.length * 1000 - k * 1000),
                        group: "user",
                      },
                    ];
                  })
                  .flat() ?? []
              }
            ></Area>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
