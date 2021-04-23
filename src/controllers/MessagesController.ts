import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesServices';

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, user_id, text } = request.body;
    const messagesService = new MessagesService();

    try {
      const message = await messagesService.create({
        admin_id,
        user_id,
        text,
      })

      return response.json(message);
    } catch (err) {
      return response.json({
        error: err.message
      })
    }

  }

  async showByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messagesService = new MessagesService();

    const list = await messagesService.findByIdUserMessages(id);

    return response.json(list);
  }
}

export { MessagesController };