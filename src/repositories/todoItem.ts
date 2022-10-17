import TodoItemEntity from '@/entity/todoItem';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TodoItemEntity)
class TodoItemRepository extends Repository<TodoItemEntity> {}

export default TodoItemRepository;
