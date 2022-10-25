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
   *            $ref: "#/definitions/UserCreateReq"
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
   *        description: TodoItem목록을 불러오고자 하는 유저ID
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
   *            $ref: "#/definitions/TodoCreateReq"
   *    parameters:
   *      - name: userId
   *        in: path
   *        description: TodoItem목록을 추가하고자 하는 유저ID
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
   *    description: "유저의 TodoItem을 전부 삭제한다."
   *    responses:
   *        '200':
   *          description: "asdasdasd"
   */
  userRouter.delete('/:userId/items', handleDeleteUserAllTodoItem);

  /**
   * @openapi
   * /api/users/{userId}/items/{itemId}:
   *  delete:
   *    description: "유저의 TodoItem을 1개 삭제한다."
   *    responses:
   *        '200':
   *          description: "asdasdasd"
   */
  userRouter.delete('/:userId/items/:itemId', handleDeleteUserOneTodoItem);

  /**
   * @openapi
   * /api/users/{userId}/items/{itemId}:
   *  put:
   *    description: "유저의 TodoItem 내용을 수정한다."
   *    responses:
   *        '200':
   *          description: "asdasdasd"
   */
  userRouter.put(
    '/:userId/items/:itemId',
    updateUserTodoItemContentsValidation,
    handleUpdateUserOneTodoItemContents,
  );

  /**
   * @openapi
   * /api/users/{userId}:
   *  put:
   *    description: "유저의 TodoItem 완료여부를 토글한다."
   *    responses:
   *        '200':
   *          description: "asdasdasd"
   */
  userRouter.put(
    '/:userId/items/:itemId/priority',
    updateUserTodoItemPriorityValidation,
    handleUpdateUserOneTodoItemPriority,
  );

  /**
   * @openapi
   * /api/users/{userId}:
   *  put:
   *    description: "특정 유저의 정보를 조회한다."
   *    responses:
   *        '200':
   *          description: "asdasdasd"
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
 *   UserCreateReq:
 *     type: "object"
 *     properties:
 *       name:
 *         type: "string"
 *         example: "testUser1"
 *   TodoCreateReq:
 *     type: "object"
 *     properties:
 *       contents:
 *         type: "string"
 *         example: "testContents1"
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
