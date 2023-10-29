import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import useMemoryStore from "../store/system/info/memory/MemoryStore";
import { LineChartOutlined } from "@ant-design/icons";

import * as bytes from "bytes";
import { Progress } from "./stats/Progress";

function MemoryState() {
  const memoryStore = useMemoryStore((state) => state.data);
  return (
    <Card size={"small"} title="Memory" extra={<LineChartOutlined />}>
      {!memoryStore ? (
        "Loading"
      ) : (
        <>
          <Progress
            title={"Free"}
            percent={(memoryStore.realfree / memoryStore.memtotal) * 100}
          />
          <Progress
            percent={(memoryStore.cached / memoryStore.memtotal) * 100}
            title={"Cached"}
          />
          <Progress
            percent={(memoryStore.buffers / memoryStore.memtotal) * 100}
            title={"Buffer"}
          />
        </>
      )}
    </Card>
  );
}

export default MemoryState;
