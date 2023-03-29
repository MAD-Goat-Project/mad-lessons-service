import { PostgresProviderModule } from "../../providers/postgres.provider.module";
import { CategorySeederModule } from "./category/data.module";
import { Logger, Module } from "@nestjs/common";
import { Seeder } from "./seeder";

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [PostgresProviderModule, CategorySeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
