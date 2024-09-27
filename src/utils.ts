import { HttpException } from '@nestjs/common';

export function returnOrThrowHttpException<T>(response: T | HttpException): T {
  if (response instanceof HttpException) {
    throw response;
  }

  return response;
}
