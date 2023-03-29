import { Injectable, Logger } from "@nestjs/common";
import { DataService } from "./category/data.service";
import { CategoryEntity } from "../../models/entitities";

@Injectable()
export class Seeder {

  constructor(
    private readonly logger: Logger,
    private readonly categorySeederService = DataService<CategoryEntity>(CategoryEntity),
  ) {}
  async seed() {
    await this.categories()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async categories() {
    // @ts-ignore
    return await Promise.all(this.categorySeederService.create())
      .then((createdLanguages) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of categories created : ' +
            // Remove all null values and return only created languages.
            createdLanguages.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
