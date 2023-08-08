import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from './configs/app.config'
import { BoardsModule } from './boards/boards.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeORMConfig } from './configs/typeorm.config'
import process from 'process'
import path from 'path'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
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
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule
  ]
})
export class AppModule {}
