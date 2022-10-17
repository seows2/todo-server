import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import TodoItemEntity from './todoItem';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar', { length: 30, unique: true })
  name: string;

  @Column(() => TodoItemEntity)
  todoList: TodoItemEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserEntity;
