import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { District } from 'src/entity/district.entity';
import { Pagination } from 'src/utils/const';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class DistrictServices {
  constructor(
    @Inject('DISTRICT_REPOSITORY')
    private readonly repo: Repository<District>,
  ) {}

  async createDistrict(body: Partial<District>): Promise<District> {
    const district = this.repo.create(body);
    return await this.repo.save(district);
  }

  async getDistricts(paginate: Pagination): Promise<District[]> {
    return this.repo.find({
      skip: paginate.offset,
      take: paginate.limit,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getDistrict(id: number): Promise<District> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!district) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return district;
  }

  async updateDistrict(
    id: number,
    updateData: Partial<District>,
  ): Promise<District> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    Object.assign(district, updateData);
    return await this.repo.save(district);
  }

  async deleteDistrict(id: number): Promise<void> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    await this.repo.softRemove(district);
  }
}
