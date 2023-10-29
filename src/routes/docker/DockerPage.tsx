import DashboardLayout from "../../components/layout/DashboardLayout";
import useDockerContainersStore from "../../store/system/info/docker/dockerContainers";
import React, { useEffect } from "react";
import { Badge, Card, Table } from "antd";

export default function DockerPage() {
  const docker = useDockerContainersStore((state) => state.data);
  useEffect(() => {
    useDockerContainersStore.getState().fetch();

    const id = setInterval(() => {
      useDockerContainersStore.getState().fetch();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <DashboardLayout>
      <Card>
        <Table
          loading={docker == null}
          bordered={true}
          size={"small"}
          pagination={false}
          scroll={{
            x: true,
          }}
          columns={[
            {
              title: "Name",
              dataIndex: "Names",
              render: (value, record, index) => {
                return value[0].replace("/", "");
              },
            },
            {
              title: "Image",
              dataIndex: "Image",
            },
            {
              title: "Network",
              dataIndex: "HostConfig",
              render: (value, record, index) => {
                return value.NetworkMode;
              },
            },
            {
              title: "State",
              dataIndex: "State",
              render: (value, record, index) => {
                return <Badge size={"small"} count={value}></Badge>;
              },
            },
          ]}
          dataSource={docker ?? []}
        ></Table>
      </Card>
    </DashboardLayout>
  );
}
