export type CreateUserReqBody = { name: string };

export type CreateTodoItemReqBody = { contents: string };

export type PriorityType = 'NONE' | 'FIRST' | 'SECOND';

export type TodoItemType = {
  id: string;
  contents: string;
  priority: PriorityType;
  isCompleted: boolean;
};

export type UserInfoType = {
  id: string;
  name: string;
  todoList: TodoItemType;
};
