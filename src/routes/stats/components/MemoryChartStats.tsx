import { Card } from "antd";
import { Area } from "@ant-design/plots";

const MemoryChartStats = () => {
  return (
    <Card size={"small"} title={"Memory"}>
      <Area data={[]}></Area>
    </Card>
  );
};

export default MemoryChartStats;
