export const ERROR = {
  NOT_FOUND: {
    statusCode: 404,
    message: 'Not Found',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal Server Error',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  CANT_NOT_FOUND_USER: {
    statusCode: 409,
    message: '해당 유저를 찾을 수 없습니다.',
  },
  CANT_NOT_FOUND_TODOITEM: {
    statusCode: 409,
    message: '해당 아이템을 찾을 수 없습니다.',
  },
  ALREADY_EXIST: {
    statusCode: 409,
    message: '이미 존재하는 Name입니다.',
  },
};
