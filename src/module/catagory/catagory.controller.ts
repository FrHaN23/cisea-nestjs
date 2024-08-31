import { Controller, Get } from '@nestjs/common';
import { CatagoryServices } from './catagory.service';

@Controller('catagory')
export class CatagoryController {
  constructor(private readonly Services: CatagoryServices) {}

  @Get()
  getCatagories() {
    return this.Services.getCatagories();
  }
}
