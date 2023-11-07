import DashboardLayout from "../../components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Select } from "antd";
import { Area } from "@ant-design/plots";
import useCpuStatsHistory from "../../store/cpu/CpuStatsHistory";
import useMemoryHistoryStore from "../../store/memory/MemoryHistoryStore";
import useNetworkHistoryStore from "../../store/network/NetworkHistoryStore";
import useDisksHistoryStore from "../../store/disks/DisksHistoryStore";
import disksHistoryStore from "../../store/disks/DisksHistoryStore";
import UtilDate from "../../utils/UtilDate";
import bytes from "bytes";
import CpuChartStats from "./components/CpuChartStats";
import DisksHistoryStore from "../../store/disks/DisksHistoryStore";
import DiskChartStats from "./components/DiskChartStats";
import MemoryChartStats from "./components/MemoryChartStats";
import NetworkChartStats from "./components/NetworkChartStats";

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
    useMemoryHistoryStore.getState().fetch();

    const id = setInterval(() => {
      useMemoryHistoryStore.getState().fetch();
    }, 1000);
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <CpuChartStats></CpuChartStats>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <MemoryChartStats></MemoryChartStats>
        </Col>
        <Col xs={12} sm={24} md={12}>
          <DiskChartStats />
        </Col>
        <Col xs={24} sm={24} md={12}>
           <NetworkChartStats></NetworkChartStats>
        </Col>
      </Row>
    </div>
  )
}
