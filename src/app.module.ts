import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsModule } from './resources/lessons/lessons.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresProviderModule } from './providers/postgres/postgres.provider.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { AssessmentsModule } from './resources/assessments/assessments.module';
import { AnswersModule } from './resources/answers/answers.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfigService } from './config/keycloak-config.service';
import { AppConfigModule } from './config/app-config.module';
import { AssessmentProgressModule } from './resources/assessment-progress/assessment-progress.module';
import { HintsModule } from './resources/hints/hints.module';
import { LessonProgressModule } from './resources/lesson-progress/lesson-progress.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LessonsModule,
    PostgresProviderModule,
    CategoriesModule,
    AssessmentsModule,
    AnswersModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [AppConfigModule],
    }),
    AssessmentProgressModule,
    HintsModule,
    LessonProgressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // This guard handles only controllers annotated with @Resource and
    // methods with @Scopes.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
