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
import { UserService } from './users.service';
import { User } from 'src/entity/user.entity';

@Controller('user')
export class CategoryController {
  constructor(private readonly Services: UserService) {}

  @Post()
  create(@Body() body: Partial<User>): Promise<any> {
    const data = this.Services.createUser(body);
    return data;
  }

  @Get()
  getCategories(
    @Query('pagination') pagination: Pagination = { offset: 0, limit: 25 },
  ): Promise<any> {
    const data = this.Services.getUsers(pagination);
    return data;
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.getUser(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<User>,
  ): Promise<any> {
    return this.Services.updateUser(id, updateData);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.Services.deleteUser(id);
  }
}
