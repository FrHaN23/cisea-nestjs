import { Controller, Get } from '@nestjs/common';
import { CatagoryServices } from './catagory.service';

@Controller('catagory')
export class CatagoryController {
  constructor(private readonly Services: CatagoryServices) {}

  @Get('')
  getHello(): string {
    return this.Services.getHello();
  }
}
