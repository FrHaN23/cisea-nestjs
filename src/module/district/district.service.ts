import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      throw new InternalServerErrorException();
    });
    if (!data) {
      throw new InternalServerErrorException();
    }
    return resp.ok(null);
  }

  async getDistricts(paginate: Pagination): Promise<any> {
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

  async getDistrictsList(): Promise<any> {
    const data = await this.repo.find({
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

  async getDistrict(id: number): Promise<any> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!district) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return resp.ok({ data: district });
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
      throw new NotFoundException();
    }
    Object.assign(district, updateData);
    const data = await this.repo.save(district).catch((e) => {
      console.log(e);
      throw new InternalServerErrorException();
    });
    if (!data) {
      throw new NotFoundException();
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
