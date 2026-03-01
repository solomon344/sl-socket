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
  socket.on("scrape:started",(data)=>{
    console.log("recieved scrape start event")

    // re-emit the scrape:start event to the connected socket instance
    io.emit("scrape:started",{...data});
  })


  // Listen to scrape complete events
  socket.on("scrape:completed", (data) => {
    const {scrapeId,message,status,jobId,url} = data
    console.log("recieved scrape completed event for scrapeId:",scrapeId)

    // re-emit the scrape:completed event to all connected clients
    io.emit("scrape:completed",{status,message,scrapeId,jobId,url});
  })

  // Listen to scrape failed events
  socket.on("scrape:failed", (data) => {
    const {scrapeId,message,status,jobId,url} = data

    console.log("recieved scrape failed event for scrapeId:",scrapeId)
    // re-emit the scrape:failed event to all connected clients
    io.emit("scrape:failed",{status, message,scrapeId,jobId,url});
})

// listen to scrape:fetched events
socket.on("scrape:fetched", (data) => {
  const {scrapeId,message,status,jobId,url} = data

  console.log("recieved scrape fetched event for scrapeId:",scrapeId)
  // re-emit the scrape:fetched event to all connected clients
  io.emit("scrape:fetched",{status, message,scrapeId,jobId,url});

})

// listen to scrape:parsed events
socket.on("scrape:parsed",(data)=>{
  const {scrapeId,message,status,jobId,url} = data

  console.log("recieved scrape parsed event for scrapeId:",scrapeId)
  // re-emit the scrape:parsed event to all connected clients
  io.emit("scrape:parsed",{status, message,scrapeId,jobId,url});
})

})





httpServer.listen(process.env.SOCKET_PORT, () => {
  console.log(`🚀 WebSocket server running on port ${process.env.SOCKET_PORT}`)
})



export { io }