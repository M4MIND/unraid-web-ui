import { Card, Col, Dropdown, Row, Tag, Typography } from "antd";
import React from "react";
import { useDockerContainersStore } from "../../../store/docker/DockerContainers";

export const DockerContainers = () => {
  const [containers, loading] = useDockerContainersStore((state) => [
    state.data,
    state.loading,
  ]);

  const regexp = new RegExp("^/", "gm");

  const stateType: { [index: string]: string } = {
    running: "green",
    restarting: "blue",
    exited: "yellow",
    default: "asd",
  };

  return (
    <Row gutter={[12, 12]}>
      {containers.map((v) => {
        return (
          <Col xs={12}>
            <Card
              size={"small"}
              extra={
                <Tag
                  color={stateType[v.State] ?? stateType["default"]}
                  style={{ margin: 0 }}
                >
                  {v.State}
                </Tag>
              }
              title={v.Names[0].replace(regexp, "")}
            >
              <Typography.Paragraph style={{ margin: 0 }}>
                {v.Status}
              </Typography.Paragraph>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
