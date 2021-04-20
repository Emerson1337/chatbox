import { Router } from 'express';

import { SettingController } from '../src/controllers/SettingController';

const settingController = new SettingController();

const routes = Router();

routes.post("/settings", settingController.create);

export { routes };