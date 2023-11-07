import { Card, Select } from "antd";
import { Area } from "@ant-design/plots";
import { useEffect } from "react";
import useNetworkHistoryStore from "../../../store/network/NetworkHistoryStore";
import bytes from "bytes";

const NetworkChartStats = () => {
  const [interfaces, selected, history, setSelected, loaded] =
    useNetworkHistoryStore((state) => [
      state.interfaces,
      state.selected,
      state.data,
      state.changeSelected,
      state.loaded,
    ]);
  useEffect(() => {
    useNetworkHistoryStore.getState().fetch();

    const id = setInterval(() => {
      useNetworkHistoryStore.getState().fetchTick();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <Card
      size={"small"}
      title={"Network"}
      extra={
        <Select
          size={"small"}
          loading={!loaded}
          key={selected}
          defaultValue={selected}
          style={{ width: 140 }}
          onChange={(v) => setSelected(v)}
          options={interfaces.map((v) => {
            return {
              value: v,
              label: v,
            };
          })}
        ></Select>
      }
    >
      <Area
        seriesField={"group"}
        loading={!loaded}
        key={selected}
        xField={"date"}
        yField={"value"}
        animation={false}
        yAxis={{
          label: {
            formatter: (v) => {
              return bytes(Number(v));
            },
          },
        }}
        data={history[selected] ?? []}
      ></Area>
    </Card>
  );
};

export default NetworkChartStats;
