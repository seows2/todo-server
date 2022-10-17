import TodoItemRepository from '@/repositories/todoItem';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
class TodoItemService {
  private todoItemRepository: TodoItemRepository;

  constructor(@InjectRepository(TodoItemRepository) todoItemRepository: TodoItemRepository) {
    this.todoItemRepository = todoItemRepository;
  }
}

export default TodoItemService;
