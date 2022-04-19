const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app)
const socketIO = require("socket.io");
const FileUtil = require("./src/js/FileUtil.js");
const io = socketIO(server)
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "src")))
app.use(bodyParser.json());
// app.post('/UploadPhoto', upload.array('photo', 10), (req, res) => {
//     console.log('req', req);
//     console.log('file', req.files);
//     console.log('body', req.body);
//     res.status(200).json({
//       message: 'success!',
//     });
//   });
app.get('/room_list', (req, res) => {
    const rFile = new FileUtil();
    console.log(rFile.readFile());
   return res.json(rFile.readFile())
});
const PORT = process.env.PORT || 80;

server.listen(PORT, () => console.log(`server start : ${PORT}`));

io.on("connection", (socket) => {
    socket.on('disconnect', () =>
    {console.log(socket._events);
      console.log(`Disconnected: ${socket.id}`);}
    );

    socket.on('join', (roomInfo) => {
        console.log(`Socket ${socket.id} joining ${roomInfo}`);      
        socket.join(roomInfo.idx);
  
        if (roomInfo.isNew) {
            const file = new FileUtil(socket.id, roomInfo.idx, roomInfo.roomName, roomInfo.ownerName, roomInfo.guestName);
            file.writeFile();
        }
     });

    socket.on('chatting', (data) => {
        console.log(data);
        io.to(data.idx).emit("chatting", data)
    })
})

