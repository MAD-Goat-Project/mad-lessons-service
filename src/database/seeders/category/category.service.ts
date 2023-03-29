import { CategoryEntity } from "../../../models/category/category.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ICategory } from "../../../models/category/category.interface";
import { categoryData } from "./data";

/**
 * Service dealing with Categories based operations.
 *
 * @class
 */
@Injectable()
export class CategorySeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<CategoryEntity>} categoryRepository
   */
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  /**
   * Seed all languages.
   *
   * @function
   */
  create(): Array<Promise<CategoryEntity>> {
    return categoryData.map(async (category: ICategory) => {
      return await this.categoryRepository
        .findOne({ where: {name: category.name }})
        .then(async dbCategory => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbCategory) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(language).then(() => { ... });
            await this.categoryRepository.save(category),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}