import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //exception: 예외정보, host: 예외 상황에 대한 context
    const ctx = host.switchToHttp(); //context
    const response = ctx.getResponse(); // context에서 response 데이터 묶음
    const request = ctx.getRequest(); // context에서 request데이터 묶음
    const status = exception.getStatus(); // exception에서 status를 가져옴 ex) 200
    // const errormessage = exception.message;
    const error = exception.getResponse(); // 받을 수 있는 타입이 string | object 인데 string인경우 커스텀한 메세지를 받은 경우이며, object를 받는경우 nestjs에서 제공하는 예외처리를 받은 경우이다.

    // res.status(400).send({error message})
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
    });
  }
}
