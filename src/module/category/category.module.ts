import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryServices } from './category.service';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryProvider } from 'src/providers/catagory.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...CategoryProvider, CategoryServices],
})
export class CategoryModule {}
