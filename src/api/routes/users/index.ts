import { Router } from 'express';
import {
  createUserTodoItemValidation,
  createUserValidation,
  updateUserTodoItemContentsValidation,
  updateUserTodoItemPriorityValidation,
} from '../validation/user';
import {
  handleGetUsers,
  handleCreateUser,
  handleGetUserDetail,
  handleCreateUserTodoItem,
  handleDeleteUserAllTodoItem,
  handleDeleteUserOneTodoItem,
  handleUpdateUserOneTodoItemContents,
  handleUpdateUserOneTodoItemPriority,
  handleUpdateUserOneTodoItemCompleted,
  handleGetUserTodoItems,
  handleDeleteUser,
} from './users.controller';

const userRouter = Router();

export default (router: Router) => {
  router.use('/users', userRouter);

  /**
   * @openapi
   * /api/users:
   *  get:
   *    description: "모든 유저 정보를 불러온다."
   *    summary: User list 불러오기
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: "#/definitions/User"
   *
   */
  userRouter.get('/', handleGetUsers);

  /**
   * @openapi
   * /api/users:
   *  post:
   *    description: "유저를 추가한다."
   *    summary: User 추가하기
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/CreateUserReq"
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/User"
   *        '400':
   *          description: "잘못된 Body가 넘어온 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   *        '409':
   *          description: "이미 존재하는 UserName일 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.post('/', createUserValidation, handleCreateUser);

  /**
   * @openapi
   * /api/users/{userId}:
   *  get:
   *    description: "특정 유저의 정보를 불러온다."
   *    summary: User 불러오기
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 불러오고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/User"
   *        '409':
   *          description: "유저가 존재하지 않은 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.get('/:userId', handleGetUserDetail);

  /**
   * @openapi
   * /api/users/{userId}:
   *  delete:
   *    description: 특정 유저를 삭제한다.
   *    summary: User 삭제하기
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 삭제하고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '204':
   *          description: "요청이 성공한 경우"
   *        '409':
   *          description: "유저가 존재하지 않은 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.delete('/:userId', handleDeleteUser);

  /**
   * @openapi
   * /api/users/{userId}/items:
   *  get:
   *    description: "유저의 TodoItem을 모두 불러온다."
   *    summary: User의 TodoItem 불러오기
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 불러오고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: "#/definitions/TodoItem"
   */
  userRouter.get('/:userId/items', handleGetUserTodoItems);

  /**
   * @openapi
   * /api/users/{userId}/items:
   *  post:
   *    description: "유저의 TodoItem을 추가한다."
   *    summary: User의 TodoItem 추가하기
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/CreateTodoReq"
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 추가하고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: "#/definitions/TodoItem"
   *        '400':
   *          description: "잘못된 Body가 넘어온 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   *        '409':
   *          description: "유저가 존재하지 않은 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.post('/:userId/items', createUserTodoItemValidation, handleCreateUserTodoItem);

  /**
   * @openapi
   * /api/users/{userId}/items:
   *  delete:
   *    description: 유저의 모든 TodoItem을 삭제한다.
   *    summary: User의 모든 TodoItem 삭제하기
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 모두 삭제하고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/User"
   *        '409':
   *          description: "유저가 존재하지 않은 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.delete('/:userId/items', handleDeleteUserAllTodoItem);

  /**
   * @openapi
   * /api/users/{userId}/items/{itemId}:
   *  delete:
   *    description: "유저의 TodoItem을 1개 삭제한다."
   *    summary: User의 TodoItem 1개 삭제하기
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 삭제하고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *      - name: itemId
   *        in: path
   *        description: 삭제하고자 하는 TodoItemID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/User"
   *        '409':
   *          description: "유저가 존재하지 않거나, TodoItem이 존재하지 않는 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.delete('/:userId/items/:itemId', handleDeleteUserOneTodoItem);

  /**
   * @openapi
   * /api/users/{userId}/items/{itemId}:
   *  put:
   *    description: "유저의 TodoItem 내용을 수정한다."
   *    summary: User의 TodoItem 내용 수정하기
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/UpdateTodoContentsReq"
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 수정하고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *      - name: itemId
   *        in: path
   *        description: 수정하고자 하는 TodoItemID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: "#/definitions/TodoItem"
   *        '400':
   *          description: "잘못된 Body가 넘어온 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   *        '409':
   *          description: "유저가 존재하지 않거나, TodoItem이 존재하지 않는 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.put(
    '/:userId/items/:itemId',
    updateUserTodoItemContentsValidation,
    handleUpdateUserOneTodoItemContents,
  );

  /**
   * @openapi
   * /api/users/{userId}/items/{itemId}/priority:
   *  put:
   *    description: "유저의 TodoItem 우선순위를 수정한다."
   *    summary: User의 TodoItem 우선순위 수정하기
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/UpdateTodoPriorityReq"
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 수정하고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *      - name: itemId
   *        in: path
   *        description: 수정하고자 하는 TodoItemID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: "#/definitions/TodoItem"
   *        '400':
   *          description: "잘못된 Body가 넘어온 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   *        '409':
   *          description: "유저가 존재하지 않거나, TodoItem이 존재하지 않는 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.put(
    '/:userId/items/:itemId/priority',
    updateUserTodoItemPriorityValidation,
    handleUpdateUserOneTodoItemPriority,
  );

  /**
   * @openapi
   * /api/users/{userId}/items/{itemId}/toggle:
   *  put:
   *    description: "유저의 TodoItem을 complete여부를 토글한다."
   *    summary: User의 TodoItem complete toggle
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: 수정하고자 하는 유저ID
   *        required: true
   *        schema:
   *          type: number
   *      - name: itemId
   *        in: path
   *        description: 수정하고자 하는 TodoItemID
   *        required: true
   *        schema:
   *          type: number
   *    responses:
   *        '200':
   *          description: "요청이 성공한 경우"
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: "#/definitions/TodoItem"
   *        '409':
   *          description: "유저가 존재하지 않거나, TodoItem이 존재하지 않는 경우"
   *          content:
   *            application/json:
   *              schema:
   *                $ref: "#/definitions/ErrResponse"
   */
  userRouter.put('/:userId/items/:itemId/toggle', handleUpdateUserOneTodoItemCompleted);

  return router;
};

/**
 * @openapi
 * definitions:
 *   TodoItem:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "number"
 *       contents:
 *         type: "string"
 *       priority:
 *         type: "string"
 *         enum:
 *            - NONE
 *            - FIRST
 *            - SECOND
 *   User:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "number"
 *       name:
 *         type: "string"
 *       todoList:
 *         type: "array"
 *         items:
 *            $ref: "#/definitions/TodoItem"
 *   CreateUserReq:
 *     type: "object"
 *     properties:
 *       name:
 *         type: "string"
 *         example: "testUser1"
 *   CreateTodoReq:
 *     type: "object"
 *     properties:
 *       contents:
 *         type: "string"
 *         example: "testContents1"
 *   UpdateTodoContentsReq:
 *     type: "object"
 *     properties:
 *       contents:
 *         type: "string"
 *         example: "updateContents1"
 *   UpdateTodoPriorityReq:
 *     type: "object"
 *     properties:
 *       priority:
 *         type: "string"
 *         enum:
 *            - NONE
 *            - FIRST
 *            - SECOND
 *         example: "FIRST"
 *   ErrResponse:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *         example: "false"
 *       statusCode:
 *         type: "number"
 *       message:
 *         type: "string"
 *         example: "error Message"
 *       stack:
 *         type: "string"
 *         example: "Error: error Message"
 */
