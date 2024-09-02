import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Penerimaan } from 'src/entity/penerimaan.entity';
import { User } from 'src/entity/user.entity';
import { Pagination } from 'src/utils/const';
import resp from 'src/utils/resp';
import { Repository } from 'typeorm/repository/Repository';
import * as ExcelJS from 'exceljs';
import * as dayjs from 'dayjs';
import { Response } from 'express';

@Injectable()
export class PenerimaanService {
  constructor(
    @Inject('PENERIMAAN_REPOSITORY')
    private readonly repo: Repository<Penerimaan>,
  ) {}

  async createPenerimaan(body: Partial<Penerimaan>): Promise<any> {
    const penerimaan = this.repo.create(body);
    const data = await this.repo.save(penerimaan).catch((e) => {
      console.log(e);
      throw new InternalServerErrorException();
    });
    if (!data) {
      throw new NotFoundException();
    }
    return resp.ok(null);
  }

  async getPenerimaans(paginate: Pagination): Promise<any> {
    const data = await this.repo.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
      order: {
        created_at: 'DESC',
      },
      relations: {
        district: true,
        user: true,
        category: true,
      },
    });
    const res = {
      data: data[0],
      count: data[1],
    };
    return resp.ok(res);
  }

  async getPenerimaansStat(year: number): Promise<any> {
    const data = await this.repo
      .createQueryBuilder('stat')
      .leftJoinAndSelect('stat.district', 'district')
      .leftJoinAndSelect('stat.user', 'user')
      .leftJoinAndSelect('stat.category', 'category')
      .where('YEAR(stat.date) = :year', { year })
      .getMany();
    return resp.ok({ data: data });
  }

  async getPenerimaan(id: number): Promise<any> {
    const data = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        district: true,
        user: true,
        category: true,
      },
    });
    if (!data) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return resp.ok({ data: data });
  }

  async updatePenerimaan(id: number, updateData: Partial<User>): Promise<any> {
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

  async deletePenerimaan(id: number): Promise<void> {
    const district = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    await this.repo.softRemove(district);
  }

  async generateExcel(res: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('sheet 1');

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Value', key: 'value', width: 20 },
      { header: 'Wilayah', key: 'wilayah', width: 15 },
      { header: 'Kota', key: 'kota', width: 25 },
      { header: 'Provinsi', key: 'provinsi', width: 25 },
      { header: 'Pusat', key: 'pusat', width: 25 },
    ];

    const data = await this.repo.find({
      order: {
        created_at: 'DESC',
      },
      relations: {
        district: true,
        user: true,
        category: true,
      },
    });

    data.forEach((e, i) => {
      const row = {
        date: dayjs(e.date).format('YYYY, MMMM'),
        No: i + 2,
        category: e.category.name,
        value: e.value,
        district: e.district.name,
        kota: (e.category.kota / 100) * e.value,
        provinsi: (e.category.provinsi / 100) * e.value,
        pusat: (e.category.pusat / 100) * e.value,
      };
      worksheet.addRow(row);
    });

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      if (rowNumber === 1) {
        row.font = { bold: true };
      }
    });
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=export_penerimaan.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
