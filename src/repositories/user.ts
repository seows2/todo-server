import UserEntity from '@/entity/user';
import { CreateUserReqBody } from '@/types';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async findByUserName(name: string) {
    const user = await this.findOne({ where: { name } });
    return user;
  }

  async findByUserId(id: string) {
    const user = await this.findOne({ where: { id }, relations: ['todoList'] });
    return user;
  }

  async createUser(userInfo: CreateUserReqBody) {
    const newUser = this.create({ ...userInfo, todoList: [] });
    const createdUser = await this.save(newUser);

    return createdUser;
  }

  async deleteUser(user: UserEntity) {
    this.remove(user);
  }

  async getAllUsers() {
    const allUsers = await this.find({ relations: ['todoList'] });

    return allUsers;
  }
}

export default UserRepository;
