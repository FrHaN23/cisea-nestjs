import { Body, Controller, Post } from '@nestjs/common';
import { AuthServices } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly Services: AuthServices) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.Services.login(loginDto);
  }
}
