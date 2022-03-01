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
        const users = await UserModel.findAll();
        response.status(200).json(users);
    }
}

export const userController = new UserController();
