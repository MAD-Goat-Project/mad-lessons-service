import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LessonsModule } from "./lessons/lessons.module";
import { ConfigModule } from "@nestjs/config";
import { PostgresProviderModule } from "./providers/postgres.provider.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LessonsModule,
    PostgresProviderModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
