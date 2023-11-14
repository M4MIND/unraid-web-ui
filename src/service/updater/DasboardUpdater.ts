import { message } from 'antd'

type WebsocketEventType = 'ping-pong' | 'cpu-data'

interface ServerEvent {
  topic: WebsocketEventType
  data: never
}

const websocketUrl = import.meta.env.VITE_APP_WEBSOCKET_API ?? ''
const websocketPathUrl = websocketUrl
let socket = new WebSocket(websocketPathUrl)
const subscribers: Map<string, (data: ServerEvent) => void> = new Map()
let isConnected = false
let currentRetry = 0
const retries = 3

const sendSubscribe = (eventType: WebsocketEventType) => {
  const request = JSON.stringify({
    eventType: 'subscribe',
    subscription: eventType
  })

  socket.onmessage = e => {
    const data = JSON.parse(e.data) as ServerEvent

    const subscriberFunc = subscribers.get(data.topic)

    if (!subscriberFunc) {
      return
    }

    subscriberFunc(data.data)
  }

  socket.send(request)
}

export const DashboardUpdater = {
  subscribe: (eventType: WebsocketEventType, callback: (data: ServerEvent) => void) => {
    subscribers.set(eventType, callback)
    if (!isConnected) {
      return
    }
    sendSubscribe(eventType)
  }
}

const onOpen = () => {
  isConnected = true
  message.open({
    type: 'success',
    content: 'Connected to websocket 🎉'
  })
  Array.from(subscribers.entries()).forEach(([key]) => {
    sendSubscribe(key as WebsocketEventType)
  })
}

socket.onopen = onOpen

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onError = (ev: Event) => {
  if (currentRetry >= retries) {
    message.open({
      type: 'error',
      content: 'Cannot reconnect. Please check your connection and refresh the page.'
    })

    return
  }
  message.open({
    type: 'loading',
    content: 'Cannot connect to the server. Reconnecting...',
    duration: 5
  })
  isConnected = false
  setTimeout(() => {
    currentRetry = currentRetry + 1
    socket = new WebSocket(websocketPathUrl)

    socket.onopen = onOpen
    socket.onerror = onError
  }, 5000)
}

socket.onerror = onError

