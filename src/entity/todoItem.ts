import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todoItem' })
class TodoItemEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('text')
  contents: string;

  @Column('text')
  priority: string;

  @Column('boolean')
  isCompleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default TodoItemEntity;
