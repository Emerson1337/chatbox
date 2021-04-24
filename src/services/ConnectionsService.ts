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

  async findAllWithoutAdmin() {
    const userWithoutAdmin = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    })
    return userWithoutAdmin;
  }

  async findBySocketId(socket_id: string) {
    const connection = await this.connectionsRepository.findOne({
      socket_id,
    })
    return connection
  };

  async updateAdminID(user_id: string, admin_id) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", {
        user_id
      })
      .execute()
  }

}

export { ConnectionService };