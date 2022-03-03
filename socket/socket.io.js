import { Server } from 'socket.io';
import { Op } from 'sequelize';
import { UserModel } from '../models/user.model.js';

const io = new Server();


export class SocketIo {

    startSocket(http) {

        this.io = new Server(http, {cors: {
            origin: '*', methods: ["GET", "POST"]
        }});

        const users = {}

        this.io.on('connection',  (socket) => {
           console.log('user connected to socket');

           socket.on('login', async (user) => {
               console.log('user logged in', socket.id);
               console.log('user logged in', user);

               await UserModel.update({socket_id: socket.id, online: true }, { where: { id: user.id }, logging: console.log });

               const onlineUsers = await UserModel.findAll({where: { online: true, id: { [Op.ne]: user.id } }, logging: console.log });

               this.io.emit('new-user-online', onlineUsers);
           });

           socket.on('disconnect', async () => {
               console.log('user ' + socket.id + ' disconnected');

               await UserModel.update({socket_id: socket.id, online: false }, { where: { socket_id: socket.id } });
               const onlineUsers = await UserModel.findAll({where: { online: true, socket_id: socket.id } });
               this.io.emit('new-user-online', onlineUsers);
               // remove saved socket from users object
               // delete users[socket.id];
           });

        });

    }
}

export class SocketIoEvents {

}
