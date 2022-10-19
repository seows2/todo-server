import TodoListEntity from '@/entity/todoItem';
import UserEntity from '@/entity/user';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TodoListEntity)
class TodoItemRepository extends Repository<TodoListEntity> {
  async createTodoItem(contents: string, user: UserEntity) {
    const newTodoItem = this.create({
      contents,
      user,
    });
    const createdTodoItem = await this.save(newTodoItem);

    return createdTodoItem;
  }
}

export default TodoItemRepository;
