import  { request, response } from 'express';
import { UserModel } from '../models/user.model.js';

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
}

export const userController = new UserController();
