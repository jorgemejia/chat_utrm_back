import { UserModel } from '../models/user.model.js';
import { conversation } from '../models/conversation.model';
import { messages } from '../models/messages.model';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize'

class UserController {

    /**
     *
     * @param request
     * @param response
     * @returns {Promise<*>}
     */
    async sayHello (request, response) {
        return response.status(200).json({
            ok: true,
            message: 'Hello'
        });
    }

    async getUsers(request, response) {
        const body = request.body;
        const users = await UserModel.findAll({
            where: body.condition
        });

        if(users.length > 0) {
            const user = users[0]
            response.status(200).json({ ok:true, user });
        } else {
            response.status(200).json({ok: false, message: 'user not found'});
        }

    }

    async createUser(request, response) {
        const user = request.body
        const query = await UserModel.create(user);

        return response.status(200).json({
            ok: true,
            message: query
        });
    }

    async loadConversation(request, response) {
        const body = request.body;
        const sender = body.sender;
        const receiver = body.receiver;
        const uuid = uuidv4();

        const fromSender = await conversation.findOne({ where: { from_id: sender, to_id: receiver } });
        const fromReceiver = await conversation.findOne({ where: { from_id: receiver, to_id: sender  } });
        let msgs = null;

        if(fromSender === null && fromReceiver !== null) {
            await conversation.create({from_id: sender, to_id: receiver, uuid: fromReceiver.uuid });
            conversation
        } else if ( fromReceiver === null && fromSender !== null ) {
            await conversation.create({from_id: sender, to_id: receiver, uuid: fromSender.uuid });
        } else {
            await conversation.create({from_id: sender, to_id: receiver, uuid: uuid });
        }




    }
}

export const userController = new UserController();
