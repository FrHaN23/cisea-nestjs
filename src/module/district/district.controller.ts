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

@Controller('category')
export class CategoryController {
  constructor(private readonly Services: DistrictServices) {}

  @Post()
  create(@Body() body: Partial<District>): Promise<District> {
    return this.Services.createDistrict(body);
  }

  @Get()
  getCategories(
    @Query('pagination') pagination: Pagination = { offset: 0, limit: 25 },
  ): Promise<District[]> {
    return this.Services.getDistricts(pagination);
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<District> {
    return this.Services.getDistrict(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<District>,
  ): Promise<District> {
    return this.Services.updateDistrict(id, updateData);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.deleteDistrict(id);
  }
}
