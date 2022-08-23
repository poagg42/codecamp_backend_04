import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException) // 에러가 났는데 그것이 HttpException이면 이 함수를 실행시켜줘
export class HttpExceptionFilter implements ExceptionFilter {
  // implement는 구현해야 된다 라는 뜻 typescript랑 비슷하다.

  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('=====================');
    console.log('HttpException');
    console.log('예외 내용', message);
    console.log('예외 코드:', status);
    console.log('=====================');
  }
}
