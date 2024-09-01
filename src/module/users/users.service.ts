import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { Pagination } from 'src/utils/const';
import { hashPassword } from 'src/utils/password.utils';
import resp from 'src/utils/resp';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repo: Repository<User>,
  ) {}

  async createUser(body: Partial<User>): Promise<any> {
    if (!body.username || !body.password) {
      throw new BadRequestException();
    }
    const hashedPassword = await hashPassword(body.password);
    body.password = hashedPassword;
    const user = this.repo.create(body);
    const data = await this.repo.save(user).catch((e) => {
      console.log(e);
      throw new InternalServerErrorException();
    });
    if (!data) {
      throw new NotFoundException();
    }
    return resp.ok(null);
  }

  async getUsers(paginate: Pagination): Promise<any> {
    const data = await this.repo.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
      order: {
        created_at: 'DESC',
      },
      relations: {
        district: true,
      },
    });
    const res = {
      data: data[0],
      count: data[1],
    };
    return resp.ok(res);
  }

  async getUser(id: number): Promise<any> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!district) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return resp.ok(district);
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<any> {
    delete updateData.id;
    if (!updateData.username || !updateData.password) {
      throw new BadRequestException();
    }
    const hashedPassword = await hashPassword(updateData.password);
    updateData.password = hashedPassword;
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

  async deleteUser(id: number): Promise<void> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    await this.repo.softRemove(district);
  }
}
