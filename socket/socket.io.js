import { Server } from 'socket.io';
import { Op } from 'sequelize';
import { UserModel } from '../models/user.model.js';
import {messages} from '../models/message.model.js';
import { conversation } from '../models/conversation.model.js';


const io = new Server();

export class SocketIo {

    startSocket(http) {
        this.io = new Server(http, { cors: {
                origin: '*', methods: ["GET", "POST"]
        }});

        const users = {};

        this.io.on('connection',  (socket) => {

            console.log('new usr in socket');

            socket.on('login', async (user) => {
                console.log('new user logged', user);
                await UserModel.update({ socket_id: socket.id, online: true }, { where: { id: user.id } });
                const onlineUsers = await UserModel.findAll({ where: { online: true } });
                this.io.emit('new-user-online', onlineUsers);

            });

            socket.on('new-message', async (data) => {
                console.log('incoming data', data);
                const msgs = await messages.findOne({ where: { conversation_uuid: data.uuid, id: data.id } });
                const conv = await conversation.findOne({ where: { uuid: data.uuid, from_id: data.from_id }});
                const user = await UserModel.findOne({ where: { id: conv.to_id } });

                // console.log('user to send', user);
                this.io.to(user.socket_id).emit('new-message', msgs);
            });


            socket.on('disconnect', async () => {
                console.log('user disconnected', socket.id);
                await UserModel.update({ socket_id: socket.id, online: false }, { where: { socket_id: socket.id } });
                const onlineUsers = await UserModel.findAll({where: { online: true, socket_id: socket.id } });
                this.io.emit('new-user-online', onlineUsers);
            });
        });
    }
}
