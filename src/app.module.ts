import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from './configs/app.config'
import databaseConfig from './configs/database.config'
import authConfig from '@/configs/auth.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { TypeormConfig } from './database/typeorm.config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from '@/users/users.module'
import process from 'process'
import path from 'path'
import { PasswordModule } from '@/auth/password/password.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: path.resolve(
        __dirname,
        '..',
        'src',
        'env',
        `${process.env.NODE_ENV}` === 'production'
          ? '.env.production'
          : '.env.development'
      )
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize()
      }
    }),
    AuthModule,
    UsersModule,
    PasswordModule
  ]
})
export class AppModule {}
