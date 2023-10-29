import {
  Button,
  Card,
  Col,
  Divider,
  Grid,
  Row,
  Space,
  Statistic,
  Table,
} from "antd";
import CpuState from "../../components/CpuState";
import MemoryState from "../../components/MemoryState";
import React, { useEffect } from "react";
import useMemoryStore from "../../store/system/info/memory/MemoryStore";
import useCpuStore from "../../store/system/info/cpu/CpuStore";
import useDockerContainersStore from "../../store/system/info/docker/dockerContainers";
import {
  PlayCircleOutlined,
  ReloadOutlined,
  StopOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../../components/layout/DashboardLayout";

import { blue, gray } from "@ant-design/colors";
import bytes from "bytes";

export default function Dashboard() {
  const containers = useDockerContainersStore((state) => state.data);
  const cpu = useCpuStore((state) => state.data);
  const memory = useMemoryStore((state) => state.data);
  useEffect(() => {
    useCpuStore.getState().fetch();
    useMemoryStore.getState().fetch();
    useDockerContainersStore.getState().fetch();

    const id = setInterval(() => {
      useCpuStore.getState().fetch();
      useMemoryStore.getState().fetch();
      useDockerContainersStore.getState().fetch();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <DashboardLayout>
      <Row gutter={[12, 12]}>
        <Col xs={8} sm={6} md={4}>
          <Card size={"small"}>
            <Statistic
              precision={2}
              value={`${100 - (cpu?.avg["cpu"].idle ?? 0)}`}
              suffix={"%"}
              title={"CPU"}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={"small"}>
            <Statistic
              value={bytes(memory ? memory.realfree * 1024 : 0)}
              title={"Memory free"}
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={"small"}>
            <Statistic title={"Stoped VMs"}></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={"small"}>
            <Statistic
              prefix={<PlayCircleOutlined />}
              title="Running containers"
              value={
                containers?.containers.filter((v) => v.State === "running")
                  .length
              }
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={"small"}>
            <Statistic
              prefix={<ReloadOutlined spin />}
              title="Restarting containers"
              value={
                containers?.containers.filter((v) => v.State === "restarting")
                  .length
              }
            ></Statistic>
          </Card>
        </Col>
        <Col xs={8} sm={6} md={4}>
          <Card size={"small"}>
            <Statistic
              prefix={<StopOutlined />}
              title="Stoped containers"
              value={
                containers?.containers.filter((v) => v.State === "stopped")
                  .length
              }
            ></Statistic>
          </Card>
        </Col>
      </Row>
      <Divider></Divider>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={8}>
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <CpuState></CpuState>
            </Col>
            <Col xs={24}>
              <MemoryState></MemoryState>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Card size={"small"} title={"Docker containers"}>
            {containers ? (
              <Table
                size={"small"}
                dataSource={containers.containers}
                columns={[
                  { title: "Name", dataIndex: "Names", key: "Names" },
                  { title: "Status", dataIndex: "Status", key: "Status" },
                  { title: "State", dataIndex: "State", key: "State" },
                  {
                    title: "Actions",
                    render: () => (
                      <Space wrap>
                        <Button type={"primary"} size={"small"}>
                          Start
                        </Button>
                        <Button type={"primary"} size={"small"}>
                          Restart
                        </Button>
                        <Button type={"primary"} size={"small"}>
                          Stop
                        </Button>
                      </Space>
                    ),
                  },
                ]}
              ></Table>
            ) : (
              "Loading"
            )}
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
