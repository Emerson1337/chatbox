import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingRepository";

import { SettingService } from '../services/SettingService';

class SettingController {

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;
    const settingService = new SettingService();


    try {
      const settings = await settingService.create({ chat, username });
      return response.json(settings);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const settingsService = new SettingService();

    const settings = await settingsService.findByUsername(username);

    return response.json(settings);
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingService = new SettingService();

    const settings = await settingService.update(username, chat);
    return response.json(settings);
  }
}

export { SettingController };