import { PriorityType } from '@/types';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import UserEntity from './user';

@Entity({ name: 'todoList' })
class TodoListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  contents: string;

  @Column({ type: 'enum', enum: ['NONE', 'FIRST', 'SECOND'], default: 'NONE' })
  priority: PriorityType;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => UserEntity, user => user.todoList, { onDelete: 'CASCADE' })
  user: UserEntity;
}

export default TodoListEntity;
