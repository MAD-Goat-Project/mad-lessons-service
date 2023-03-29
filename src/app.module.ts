import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsModule } from './lessons/lessons.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresProviderModule } from './providers/postgres.provider.module';
import entities from './models';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LessonsModule,
    PostgresProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
