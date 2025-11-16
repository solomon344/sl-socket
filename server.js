import { Server } from 'socket.io'
import { createServer } from 'http'
import "dotenv/config"

// Create HTTP server and Socket.IO server
const httpServer = createServer((req, res) => {
  res.end('<h1>WebSocket Server is running</h1>')
})
const io = new Server(httpServer, {
  cors: {
    origin:"*", // or your frontend URL
  },
})




// Socket.IO event listeners

// Connection event
io.on('connection', socket => {
  
  console.log('🧠 WebSocket connected:', socket.id)
  
//  connected socket instance sends a scrape:start event
  socket.on("scrape:start",()=>{
    console.log("recieved scrape start event")

    // re-emit the scrape:start event to the connected socket instance
    socket.emit("scrape:start")
  })

 


  // Listen to scrape complete events
  socket.on("scrape:completed", (data) => {
    const {projectId,message,status} = data
    console.log("recieved scrape completed event for projectId:",projectId)

    // re-emit the scrape:completed event to all connected clients
    io.emit(`scrape:${projectId}`,{status,message});
  })
  
  // Listen to scrape failed events
  socket.on("scrape:failed", (data) => {
    const {projectId,message,status} = data

    // re-emit the scrape:failed event to all connected clients
    io.emit(`scrape:${projectId}:failed`,{status, message});
})

})





httpServer.listen(process.env.SOCKET_PORT, () => {
  console.log(`🚀 WebSocket server running on port ${process.env.SOCKET_PORT}`)
})



export { io }