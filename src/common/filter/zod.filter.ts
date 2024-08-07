import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: ZodError | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Resource you are requesting is not found';

    if (exception instanceof ZodError) {
      status = HttpStatus.NOT_FOUND;

    } else if (exception instanceof HttpException && exception.getStatus() === HttpStatus.NOT_FOUND) {
      status = HttpStatus.NOT_FOUND;
    }

    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}
