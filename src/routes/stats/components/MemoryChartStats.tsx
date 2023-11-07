import { Card } from 'antd'
import { Area } from '@ant-design/plots'

export const MemoryChartStats = () => (
  <Card size={'small'} title={'Memory'}>
    <Area data={[]}></Area>
  </Card>
)
