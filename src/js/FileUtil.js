const fs = require('fs');   
const filePath = '/Users/jso/Desktop/dream/chat/src/js/roomInfo.txt';

class FileUtil {       
    constructor (socketId, idx, roomName, ownerName, guestName) {
        this.socketId = socketId;
        this.idx = idx;        
        this.roomName = roomName;
        this.ownerName = ownerName;   
        this.guestName = guestName;      
    }    

    writeFile() {     
        fs.writeFile(filePath, makeRoom(this.socketId, this.idx, this.roomName, this.ownerName,  this.guestName),function(err){ 
            if (err === null) { 
                console.log('success'); 
            } else { 
                console.log('fail'); 
            } 
        });
    }

    readFile() {
        return makeRoomList();
    }
}

const makeRoom = (socketId, idx, roomName, ownerName, guestName) => {
    let roomArray = makeRoomList();
    roomArray.push({socketId: socketId, idx: idx, roomName: roomName, ownerName: ownerName, guestName: guestName})
    return JSON.stringify(roomArray);
}

const makeRoomList = () => {
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));     
}



module.exports = FileUtil;