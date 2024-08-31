import { Module } from '@nestjs/common';
import { CategoryController } from './district.controller';
import { DistrictServices } from './district.service';
import { DatabaseModule } from 'src/database/database.module';
import { DistrictProvider } from 'src/providers/district.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...DistrictProvider, DistrictServices],
})
export class DistrictModule {}
