import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io('/', { transports: ['websocket'], path: '/api/socket.io' })

const feathersClient = feathers()
  .configure(socketio(socket, {
    timeout: 120000
  }))

export default feathersClient
