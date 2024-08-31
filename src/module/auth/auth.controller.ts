import { Controller, Get } from '@nestjs/common';
import { AuthServices } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly Services: AuthServices) {}

  @Get('hello')
  getHello(): string {
    return this.Services.getHello();
  }
}
