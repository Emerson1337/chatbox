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

}

export { SettingController };