const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const fs = require("fs");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js")

const PORT = process.env.PORT || 5000;

const router = require("./router")

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*"
    }
});

app.use(router);
app.use(cors());

io.on("connection", (socket) => {

    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name: name, room: room });

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit("message", { user: "CritChat", text: `${user.name}, welcome to the space!` });
        socket.broadcast.to(user.room).emit("message", { user: "CritChat", text: `${user.name} has joined the space. ` })

        io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) })

        callback();
    });

    socket.on("sendMessage", (message, callback) => {

        const user = getUser(socket.id);
        
        io.to(user.room).emit("message", { user: user.name, text: message });
        // io.to(user.room).emit("roomData", { room: user.room, text: message });

        callback();
    });

    socket.on('sendImage', (image, callback) => {

            const user = getUser(socket.id);

            io.to(user.room).emit("image", { image: image });

            callback();

            // const buffer = Buffer.from(image, 'base64');
            // await fs.writeFile('/tmp/image', buffer).catch(console.error);
            
            // socket.emit('image', image.toString('base64'));

            // callback();
        });
        
    // socket.on('image', async (image, callback) => {
    //     const buffer = Buffer.from(image, 'base64');
    //     await fs.writeFile('/tmp/image', buffer).catch(console.error);
        
    //     socket.emit('image', image.toString('base64'));

    //     callback();
    // });

    

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit("message", { user:"CritChat", text: `${user.name} has left the space.`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });

    
})



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

