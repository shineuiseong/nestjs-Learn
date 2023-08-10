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

// declare const module: any
async function bootstrap() {
  // TODO: NestJS 애플리케이션 생성
  const app = await NestFactory.create(AppModule, { cors: true })
  // TODO:  애플리케이션의 주 모듈을 선택하여 의존성 주입 설정
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // TODO: ConfigService를 통해 설정 값을 가져옴
  const configService = app.get(ConfigService<AppConfigType>)

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

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const port = configService.getOrThrow('app.port', { infer: true })
  await app.listen(port)
  console.log(`listening on port ${port}`)
}
void bootstrap()
