import { Badge, Card, Col, Progress as AntProgress, Row } from "antd";
import useCpuStore, { CpuData } from "../store/system/info/cpu/CpuStore";
import React from "react";
import { DashboardFilled, DashboardOutlined } from "@ant-design/icons";
import { red } from "@ant-design/colors";
import { Progress } from "./stats/Progress";

function CpuState() {
  const cpuState = useCpuStore((state) => state.data);

  return (
    <Card
      size={"small"}
      extra={<DashboardFilled />}
      title={"CPU"}
      loading={!cpuState}
    >
      {cpuState ? (
        <Row gutter={[12, 0]}>
          {Object.keys(cpuState.avg)
            .filter((v) => v !== "cpu")
            .sort((a, b) => {
              const _a = Number(a.replace("cpu", ""));
              const _b = Number(b.replace("cpu", ""));
              if (_a > _b) {
                return 1;
              }
              if (_a < _b) {
                return -1;
              }
              return 0;
            })
            .map((v) => {
              return (
                <Col key={v} span={12}>
                  <Progress percent={100 - cpuState.avg[v].idle} title={v} />
                </Col>
              );
            })}
        </Row>
      ) : (
        "Loading"
      )}
    </Card>
  );
}

export default CpuState;
