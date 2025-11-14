import { Server } from 'socket.io'
import { createServer } from 'http'
import "dotenv/config"

// Create HTTP server and Socket.IO server
const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin:"*", // or your frontend URL
  },
})




// Socket.IO event listeners

// Connection event
io.on('connection', socket => {
  socket.
  console.log('🧠 WebSocket connected:', socket.id)
  
//  connected socket instance sends a scrape:start event
  socket.on("scrape:start",()=>{
    console.log("recieved scrape start event")

    // re-emit the scrape:start event to the connected socket instance
    socket.emit("scrape:start")
  })

    // connected socket instance sends a scrape:completed event
  socket.on("scrape:completed",()=>{

    // re-emit the scrape:completed event to the connected socket instance
    socket.emit("scrape:completed")
  })
})



httpServer.listen(4000,"0.0.0.0", () => {
  console.log('🚀 WebSocket server running on port 4000')
})



export { io }