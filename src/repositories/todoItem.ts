import TodoListEntity from '@/entity/todoItem';
import UserEntity from '@/entity/user';
import { TodoItemUpdateInfo } from '@/types';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TodoListEntity)
class TodoItemRepository extends Repository<TodoListEntity> {
  async findById(itemId: string) {
    const item = await this.findOne({ where: { id: itemId } });

    return item;
  }

  async createTodoItem(contents: string, user: UserEntity) {
    const newTodoItem = this.create({
      contents,
      user,
    });
    const createdTodoItem = await this.save(newTodoItem);

    return createdTodoItem;
  }

  async deleteAllTodoItem(user: UserEntity) {
    const { todoList } = user;
    await this.remove(todoList);
  }

  async deleteOneTodoItem(todoItem: TodoListEntity) {
    await this.remove(todoItem);
  }

  async updateTodoItem(todoItem: TodoListEntity, todoInfo: TodoItemUpdateInfo) {
    await this.update(todoItem, todoInfo);
    const item = await this.findOne({ where: { id: todoItem.id } });
    return item;
  }
}

export default TodoItemRepository;
