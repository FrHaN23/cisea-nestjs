import { Module } from '@nestjs/common';
import { CatagoryController } from './catagory.controller';
import { CatagoryServices } from './catagory.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CatagoryController],
  providers: [CatagoryServices],
})
export class AuthModule {}
