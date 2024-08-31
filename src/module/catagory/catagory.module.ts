import { Module } from '@nestjs/common';
import { CatagoryController } from './catagory.controller';
import { CatagoryServices } from './catagory.service';

@Module({
  controllers: [CatagoryController],
  providers: [CatagoryServices],
})
export class AuthModule {}
