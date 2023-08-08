import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from './configs/app.config'
import databaseConfig from './configs/database.config'
import { BoardsModule } from './boards/boards.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { TypeormConfig } from './database/typeorm.config'
import process from 'process'
import path from 'path'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
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
    BoardsModule
  ]
})
export class AppModule {}
