import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { AppConfigType } from './configs/config.type'
import validationOptions from './utils/validate.global.options'
import { AppModule } from './app.module'
import { ErrorExceptionFilter } from '@/common/exception/error-exception.filter'
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor'

// declare const module: any
async function bootstrap() {
  // TODO: NestJS 애플리케이션 생성
  const app = await NestFactory.create(AppModule)
  // TODO: ConfigService를 통해 설정 값을 가져옴
  const configService = app.get(ConfigService<AppConfigType>)

  // TODO: Config cors
  app.enableCors({
    origin: configService.getOrThrow('app.frontDomain', { infer: true }),
    credentials: true
  })
  // TODO:  애플리케이션의 주 모듈을 선택하여 의존성 주입 설정
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // TODO: 애플리케이션의 종료 시그널에 대한 처리를 활성화 (메모리 누수 방지)
  app.enableShutdownHooks()

  // TODO: API 전역 접두사 설정
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/']
    }
  )

  // TODO: 버전 관리 활성화
  app.enableVersioning({
    type: VersioningType.URI
  })

  //TODO:  전역 유효성 검사 파이프 설정
  app.useGlobalPipes(new ValidationPipe(validationOptions))

  app.useGlobalInterceptors(new ResponseInterceptor())

  // TODO: 전역 응답 객체 직렬화 설정
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.useGlobalFilters(new ErrorExceptionFilter())

  const port = configService.getOrThrow('app.port', { infer: true })
  await app.listen(port)
  console.log(`listening on port ${port}`)
}
void bootstrap()
