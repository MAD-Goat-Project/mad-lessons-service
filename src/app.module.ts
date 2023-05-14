import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsModule } from './resources/lessons/lessons.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresProviderModule } from './providers/postgres.provider.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { AssessmentsModule } from './resources/assessments/assessments.module';
import { AnswersModule } from './resources/answers/answers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LessonsModule,
    PostgresProviderModule,
    CategoriesModule,
    AssessmentsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
