import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryServices } from './category.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryServices],
})
export class AuthModule {}
