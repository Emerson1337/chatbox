import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socket_id: string,
  user_id: string,
  admin_id?: string,
  id?: string,
}

class ConnectionService {

  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      admin_id,
      user_id,
      id
    });

    await this.connectionsRepository.save(connection);
  }

  async findByUserId(user_id: string) {
    const userConnected = this.connectionsRepository.findOne({
      user_id
    })

    return userConnected
  }
}

export { ConnectionService };