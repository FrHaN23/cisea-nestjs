import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { Pagination } from 'src/utils/const';
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

  async getCategories(paginate: Pagination): Promise<Category[]> {
    return this.repo.find({
      skip: paginate.offset,
      take: paginate.limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getCategory(id: number): Promise<Category> {
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
    return category;
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
