import UserEntity from '@/entity/user';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {}

export default UserRepository;
