import {
  Document,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  PopulateOptions,
  QueryFilter,
  Types,
  UpdateQuery,
} from "mongoose";

export abstract class BaseRepository<T extends Document> {
  protected readonly model: PaginateModel<T>;

  constructor(model: PaginateModel<T>) {
    this.model = model;
  }

  async findAll(filter: QueryFilter<T> = {}, lean: boolean = true) {
    const query = this.model.find(filter);
    return lean ? query.lean() : query;
  }

  async findById(id: string | Types.ObjectId, lean: boolean = true) {
    const query = this.model.findById(id);
    return lean ? query.lean() : query;
  }

  async findOne(filter: QueryFilter<T> = {}, lean: boolean = true) {
    const query = this.model.findOne(filter);
    return lean ? query.lean() : query;
  }

  async create(data: Partial<T>) {
    const doc = new this.model(data);
    return await doc.save();
  }

  async updateById(id: string | Types.ObjectId, data: UpdateQuery<T>) {
    return await this.model.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async deleteById(id: string | Types.ObjectId) {
    return await this.model.findByIdAndDelete(id, {
      returnDocument: "after",
    });
  }

  async exists(filter: QueryFilter<T>) {
    const result = await this.model.exists(filter);
    return result !== null;
  }

  async count(filter: QueryFilter<T>) {
    return await this.model.countDocuments(filter);
  }

  async paginate(
    filter: QueryFilter<T>,
    options: PaginateOptions & {
      select?: string[];
      populate?: PopulateOptions | PopulateOptions[];
    },
  ): Promise<PaginateResult<T>> {
    return this.model.paginate(filter, {
      lean: true,
      ...options,
    });
  }
}
