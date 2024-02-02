import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

server.listen(PORT, () => {
  console.log(`Server is running at Port:- ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket
io.on("connection", (socket) => {
  console.log(`User Connected with ID:- ${socket.id}`);
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
