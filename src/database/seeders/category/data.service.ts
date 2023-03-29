import { Injectable, Type } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { categoryData } from "./data";

export abstract class IDataService<T> {
  readonly repository: Repository<T>
  create: () => Array<Promise<T>>
}
interface IDataServiceHost<T> extends IDataService<T> {
  // Add any additional properties or methods specific to DataServiceHost
}
type Constructor<I> = new (...args: any[]) => I // Main Point


/**
 * Service dealing with Categories based operations.
 *
 * @class
 */
export function DataService<T>(entity: Constructor<T>): Type<IDataService<T>> {
  @Injectable()
  class DataServiceHost implements IDataServiceHost<T> {
    private data: any;
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<T>} categoryRepository
   */
  constructor(
    @InjectRepository(entity)
    public readonly repository: Repository<T>,
  ) {
    this.data = categoryData;
  }

  /**
   * Seed all languages.
   *
   * @function
   */
  public create(): Array<Promise<T>> {
    return this.data.map(async (category: T) => {
      return await this.repository.find()

      //.findOne({ where: { name: category } })
        .then(async (dbCategory) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbCategory) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            // or create(language).then(() => { ... });
            await this.repository.save(category),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

}
  return DataServiceHost
}


