import { 
  ArgumentsHost, 
  Catch, 
  ExceptionFilter, 
  HttpException, 
  HttpStatus,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Catch()
export class AllException implements ExceptionFilter {
  constructor(private readonly prisma: PrismaService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException 
      ? exception.getResponse() 
      : 'Internal server error';

    const errorMessage = typeof message === 'string' 
      ? message 
      : (message as any).message || message;

    const errorStr = Array.isArray(errorMessage) 
      ? errorMessage.join(', ') 
      : String(errorMessage);

    const errorCode = exception.code || 'UNKNOWN_ERROR';
    const session_id = request.user?.id || null;

    try {
      await this.prisma.log.create({
        data: {
          statusCode: status,
          timeStamp: new Date(),
          path: request.url,
          error: errorStr,
          errorCode: String(errorCode),
          session_id,
        },
      });
    } catch (dbError) {
      console.error('Error guardando log en DB:', dbError);
    }

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      error: errorMessage,
      errorCode
    });
  }
}
