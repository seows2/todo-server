import { ERROR } from '@/constants/error';
import UserRepository from '@/repositories/user';
import { CreateUserReqBody } from '@/types';
import ErrorResponse from '@/utils/errorResponse';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
class UserService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUser() {
    const users = await this.userRepository.getAllUsers();

    return users;
  }

  async getUserDetail(userId: string) {
    const userDetail = await this.userRepository.findByUserId(userId);
    if (!userDetail) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }
    const { id, name, todoList } = userDetail;
    return { id, name, todoList };
  }

  async createUser(userInfo: CreateUserReqBody) {
    const alreadyRegisteredUser = await this.userRepository.findByUserName(userInfo.name);
    if (alreadyRegisteredUser) {
      throw new ErrorResponse(ERROR.ALREADY_EXIST);
    }
    const { id, name, todoList } = await this.userRepository.createUser(userInfo);

    return { id, name, todoList };
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }
    await this.userRepository.deleteUser(user);
  }
}

export default UserService;
