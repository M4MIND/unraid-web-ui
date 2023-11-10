import {Card, Table} from 'antd'
import React from 'react'
import {useDockerContainersStore} from '../../../store/docker/DockerContainers'

export const DockerContainers = () => {
  const containers = useDockerContainersStore(state => state.data)

  return (
    <Card size={'small'} title={'Docker containers'}>
      {containers ? (
        <Table
          size={'small'}
          dataSource={containers ?? []}
          columns={[
            { title: 'Name', dataIndex: 'Names', key: 'Names' },
            { title: 'Status', dataIndex: 'Status', key: 'Status' },
            { title: 'State', dataIndex: 'State', key: 'State' }
          ]}
        ></Table>
      ) : (
        'Loading'
      )}
    </Card>
  )
}
