import React, {useEffect} from 'react'
import {Card, Table, Tag} from 'antd'
import {useDockerContainersStore} from '../../store/system/info/docker/dockerContainers'
import {PlayCircleOutlined, StopOutlined, SyncOutlined} from '@ant-design/icons'

export const DockerPage = () => {
  const docker = useDockerContainersStore(state => state.data)
  useEffect(() => {
    useDockerContainersStore.getState()
      .fetch()

    const id = setInterval(() => {
      useDockerContainersStore.getState()
        .fetch()
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div>
      <Card>
        <Table
          loading={docker === null}
          bordered={true}
          size={'small'}
          pagination={false}
          scroll={{
            x: true
          }}
          columns={[
            {
              title: 'Name',
              dataIndex: 'Names',
              key: 'Names',
              render: value => value[0].replace('/', '')
            },
            {
              title: 'Image',
              key: 'Image',
              dataIndex: 'Image'
            },
            {
              title: 'Network',
              key: 'Network',
              dataIndex: 'HostConfig',
              render: value => value.NetworkMode
            },
            {
              title: 'State',
              key: 'State',
              dataIndex: 'State',
              render: value => {
                switch (value) {
                  case 'running':
                    return <Tag color="success" icon={<PlayCircleOutlined/>}>processing</Tag>
                  case 'created':
                    return <Tag color="warning" icon={<SyncOutlined/>}>created</Tag>
                  case 'exited':
                    return <Tag color="error" icon={<StopOutlined/>}>stopped</Tag>
                  default:
                    return <Tag color="default">unknown</Tag>
                }
              }
            }
          ]}
          dataSource={docker ?? []}
        ></Table>
      </Card>
    </div>
  )
}
