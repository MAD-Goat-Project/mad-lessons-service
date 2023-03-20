import { Module } from '@nestjs/common';
import { LessonsModule } from '../lessons/lessons.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../models';

/**
 * Import and provide base typeORM for postgres database
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        // TODO : Change this to false in production
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ProvidersModule {}
