import {Manager} from 'socket.io-client'

interface Message {
  data: any,
  topic: string
  error?: {
    message: string
  }
}

class WebsocketIo {
  private socket: WebSocket
  private subscribers: Map<string, ((message: any) => void)[]> = new Map()
  private queue: Map<string, ((message: any) => void)[]> = new Map()
  private connected = false
  constructor() {
    this.socket = new WebSocket(import.meta.env.VITE_APP_WEBSOCKET_API)

    this.socket.onopen = () => {
      this.connected = true

      for (const k of this.queue.keys()) {
        const request = JSON.stringify({
          eventType: 'subscribe',
          subscription: k
        })

        if (!this.subscribers.has(k)) {
          this.subscribers.set(k, [])
        }

        for (const callback of this.queue.get(k) ?? []) {
          this.subscribers.get(k)?.push(callback)
        }

        this.queue.delete(k)
        this.socket.send(request)
      }
    }

    this.socket.onmessage = e => {
      const message = JSON.parse(e.data) as Message

      for (const item of this.subscribers.get(message.topic) ?? []) {
        item(message.data)
      }
    }
  }

  unsubscribe(topic: string) {
    const request = JSON.stringify({
      eventType: 'unsubscribe',
      subscription: topic
    })

    this.socket.send(request)

    return this
  }

  subscribe<T>(topic: string, callback: (message: T) => void ) {
    if (!this.connected) {
      if (!this.queue.has(topic)) {
        this.queue.set(topic, [])
      }

      this.queue.get(topic)?.push(callback)

      return
    }

    const request = JSON.stringify({
      eventType: 'subscribe',
      subscription: topic
    })

    this.socket.send(request)

    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, [])
    }

    this.subscribers.get(topic)?.push(callback)
  }
}

export const WebsocketTopics = new WebsocketIo()
