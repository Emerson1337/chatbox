import { response } from "express";
import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/Users";
import { UsersRepository } from "../repositories/UserRepository"

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    //verfificar se usuario existe, se nao, salvar no db
    const userExists = await this.usersRepository.findOne({
      email
    });

    if (userExists) {
      return userExists;
    };

    const user = this.usersRepository.create({
      email
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersService }