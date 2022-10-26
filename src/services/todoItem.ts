import { ERROR } from '@/constants/error';
import TodoItemRepository from '@/repositories/todoItem';
import UserRepository from '@/repositories/user';
import { CreateTodoItemReqBody, PriorityType } from '@/types';
import ErrorResponse from '@/utils/errorResponse';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
class TodoItemService {
  private userRepository: UserRepository;

  private todoItemRepository: TodoItemRepository;

  constructor(
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @InjectRepository(TodoItemRepository) todoItemRepository: TodoItemRepository,
  ) {
    this.userRepository = userRepository;
    this.todoItemRepository = todoItemRepository;
  }

  async getUserTodoItems(userId: string) {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }
    const { todoList } = user;
    return { todoList };
  }

  async createUserTodoItem(TodoInfoToCreate: CreateTodoItemReqBody, userId: string) {
    const targetUser = await this.userRepository.findByUserId(userId);
    if (!targetUser) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }

    const { id, contents, priority, isCompleted, user } =
      await this.todoItemRepository.createTodoItem(TodoInfoToCreate.contents, targetUser);

    return { ...user, todoList: [...user.todoList, { id, contents, priority, isCompleted }] };
  }

  async deleteUserAllTodoItem(userId: string) {
    const targetUser = await this.userRepository.findByUserId(userId);
    if (!targetUser) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }

    await this.todoItemRepository.deleteAllTodoItem(targetUser);

    const user = await this.userRepository.findByUserId(userId);

    return user;
  }

  async deleteUserOneTodoItem(userId: string, itemId: string) {
    const targetUser = await this.userRepository.findByUserId(userId);
    if (!targetUser) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }
    const targetTodoItem = await this.todoItemRepository.findById(itemId);
    if (!targetTodoItem) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_TODOITEM);
    }

    await this.todoItemRepository.deleteOneTodoItem(targetTodoItem);

    const user = await this.userRepository.findByUserId(userId);

    return user;
  }

  async updateUserTodoItemContents(userId: string, itemId: string, contents: string) {
    const targetUser = await this.userRepository.findByUserId(userId);
    if (!targetUser) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }
    const targetTodoItem = await this.todoItemRepository.findById(itemId);
    if (!targetTodoItem) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_TODOITEM);
    }

    const updatedTodoItem = await this.todoItemRepository.updateTodoItem(targetTodoItem, {
      contents,
    });

    return updatedTodoItem;
  }

  async updateUserTodoItemPriority(userId: string, itemId: string, priority: PriorityType) {
    const targetUser = await this.userRepository.findByUserId(userId);
    if (!targetUser) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }
    const targetTodoItem = await this.todoItemRepository.findById(itemId);
    if (!targetTodoItem) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_TODOITEM);
    }

    const updatedTodoItem = await this.todoItemRepository.updateTodoItem(targetTodoItem, {
      priority,
    });

    return updatedTodoItem;
  }

  async updateUserTodoItemCompleted(userId: string, itemId: string) {
    const targetUser = await this.userRepository.findByUserId(userId);
    if (!targetUser) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_USER);
    }
    const targetTodoItem = await this.todoItemRepository.findById(itemId);
    if (!targetTodoItem) {
      throw new ErrorResponse(ERROR.CANT_NOT_FOUND_TODOITEM);
    }

    const updatedTodoItem = await this.todoItemRepository.updateTodoItem(targetTodoItem, {
      isCompleted: !targetTodoItem.isCompleted,
    });

    return updatedTodoItem;
  }
}

export default TodoItemService;
