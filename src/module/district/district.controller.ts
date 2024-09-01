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
import { DistrictServices } from './district.service';
import { Pagination } from 'src/utils/const';
import { District } from 'src/entity/district.entity';

@Controller('district')
export class CategoryController {
  constructor(private readonly Services: DistrictServices) {}

  @Post()
  create(@Body() body: Partial<District>): Promise<any> {
    const data = this.Services.createDistrict(body);
    return data;
  }

  @Get()
  getCategories(
    @Query('pagination') pagination: Pagination = { offset: 0, limit: 25 },
  ): Promise<any> {
    const data = this.Services.getDistricts(pagination);
    return data;
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.getDistrict(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<District>,
  ): Promise<any> {
    return this.Services.updateDistrict(id, updateData);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.deleteDistrict(id);
  }
}
