import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {

    const { email } = request.body;

    const usersService = new UsersService();

    const user = await usersService.create(email);

    return response.status(200).json(user)
  }
}

export { UserController }