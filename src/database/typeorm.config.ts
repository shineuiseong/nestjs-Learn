import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { AllConfigType } from '../configs/config.type'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type', { infer: true }),
      url: this.configService.get('database.url', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      synchronize: this.configService.get('database.synchronize', {
        infer: true
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      logging:
        this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      extra: {
        max: this.configService.get('database.maxConnections', { infer: true })
      }
    } as TypeOrmModuleOptions
  }
}

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'board-app',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true
// }
