import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import TodoListEntity from './todoItem';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, unique: true })
  name: string;

  @OneToMany(() => TodoListEntity, todoList => todoList.user)
  todoList: TodoListEntity[];
}

export default UserEntity;
