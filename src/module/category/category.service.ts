import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { Pagination } from 'src/utils/const';
import resp from 'src/utils/resp';
import { IsNull } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CategoryServices {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly repo: Repository<Category>,
  ) {}

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = this.repo.create(categoryData);
    return this.repo.save(category);
  }

  async getCategories(paginate: Pagination): Promise<any> {
    const data = await this.repo.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
      order: {
        created_at: 'DESC',
      },
    });
    const res = {
      data: data[0],
      count: data[1],
    };
    return resp.ok(res);
  }

  async getCategoriesList(): Promise<any> {
    const data = await this.repo.find({
      where: {
        parent_id: IsNull(),
      },
      select: {
        id: true,
        name: true,
        parent_id: true,
      },
    });
    const res = {
      data: data,
    };
    console.log(res);
    return resp.ok(res);
  }

  async getCategoriesListChild(parent_id: number): Promise<any> {
    const data = await this.repo.find({
      where: {
        parent_id: parent_id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const res = {
      data: data,
    };
    return resp.ok(res);
  }

  async getCategory(id: number): Promise<any> {
    const category = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        children: true,
        parent: true,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return resp.ok({ data: category });
  }

  async getCategoriesChildren(id: number): Promise<any> {
    const category = await this.repo.find({
      where: {
        parent_id: id,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return resp.ok({ data: category });
  }

  async updateCategory(
    id: number,
    updateData: Partial<Category>,
  ): Promise<Category> {
    const category = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    Object.assign(category, updateData);
    if (category.parent && typeof category.parent === 'number') {
      category.parent = await this.repo.findOne(category.parent);
    }
    return this.repo.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    await this.repo.softRemove(category);
  }
}
