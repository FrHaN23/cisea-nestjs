import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Pagination } from 'src/utils/const';
import { User } from 'src/entity/user.entity';
import { Penerimaan } from 'src/entity/penerimaan.entity';
import { PenerimaanService } from './penerimaan.service';

@Controller('penerimaan')
export class PenerimaanController {
  constructor(private readonly Services: PenerimaanService) {}

  @Post()
  create(@Body() body: Partial<Penerimaan>): Promise<any> {
    const data = this.Services.createPenerimaan(body);
    return data;
  }

  @Get()
  getPenerimaans(
    @Query('pagination') pagination: Pagination = { offset: 0, limit: 25 },
  ): Promise<any> {
    const data = this.Services.getPenerimaans(pagination);
    return data;
  }

  @Get(':id')
  getPenerimaan(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.getPenerimaan(id);
  }

  @Put(':id')
  updatePenerimaan(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<User>,
  ): Promise<any> {
    return this.Services.updatePenerimaan(id, updateData);
  }

  @Delete(':id')
  deletePenerimaan(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.deletePenerimaan(id);
  }
}
