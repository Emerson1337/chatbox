import { Router } from 'express';

import { UserController } from '../src/controllers/UsersController';
import { SettingController } from '../src/controllers/SettingController';
import { MessagesController } from '../src/controllers/MessagesController';


const settingController = new SettingController();
const usersController = new UserController();
const messagesController = new MessagesController();


const routes = Router();

routes.post("/settings", settingController.create);
routes.post("/users", usersController.create);
routes.post("/messages", messagesController.create);

routes.get("/messages/:id", messagesController.showByUser);



export { routes };