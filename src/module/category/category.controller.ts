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
import { CategoryServices } from './category.service';
import { Category } from 'src/entity/category.entity';
import { Pagination } from 'src/utils/const';

@Controller('category')
export class CategoryController {
  constructor(private readonly Services: CategoryServices) {}

  @Post()
  create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.Services.createCategory(categoryData);
  }

  @Get()
  getCategories(
    @Query('pagination') pagination: Pagination = { offset: 0, limit: 25 },
  ): Promise<any> {
    return this.Services.getCategories(pagination);
  }
  @Get('list')
  getCategoriesList(): Promise<any> {
    return this.Services.getCategoriesList();
  }

  @Get('list/:id/sub')
  getCategoriesListChild(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.getCategoriesListChild(id);
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.getCategory(id);
  }

  @Get(':id/details')
  getCategoryChild(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.getCategoriesChildren(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Category>,
  ): Promise<any> {
    return this.Services.updateCategory(id, updateData);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.deleteCategory(id);
  }
}
