import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse()
    const status = response.statusCode // Get the status code from the response
    return next.handle().pipe(
      map((data) => ({
        success: true,
        status,
        timestamp: new Date().toISOString(),
        result: data
      }))
    )
  }
}
