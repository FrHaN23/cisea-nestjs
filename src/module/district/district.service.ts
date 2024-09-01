import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { District } from 'src/entity/district.entity';
import { Pagination } from 'src/utils/const';
import resp from 'src/utils/resp';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class DistrictServices {
  constructor(
    @Inject('DISTRICT_REPOSITORY')
    private readonly repo: Repository<District>,
  ) {}

  async createDistrict(body: Partial<District>): Promise<any> {
    const district = this.repo.create(body);
    const data = await this.repo.save(district).catch((e) => {
      console.log(e);
      return resp.error(500, 'internal server error');
    });
    if (!data) {
      return resp.error(500, 'internal server error');
    }
    return resp.ok(null);
  }

  async getDistricts(paginate: Pagination): Promise<any> {
    const data = await this.repo.find({
      skip: paginate.offset,
      take: paginate.limit,
      order: {
        created_at: 'DESC',
      },
    });
    return resp.ok(data);
  }

  async getDistrict(id: number): Promise<any> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!district) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return resp.ok(district);
  }

  async updateDistrict(
    id: number,
    updateData: Partial<District>,
  ): Promise<any> {
    delete updateData.id;
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!district) {
      return resp.error(404, 'not found');
    }
    Object.assign(district, updateData);
    const data = await this.repo.save(district).catch((e) => {
      console.log(e);
      return resp.error(500, 'internal server error');
    });
    if (!data) {
      return resp.error(500, 'internal server error');
    }
    return resp.ok(null);
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
