import { Body, Controller, Post } from '@nestjs/common';
import { AuthServices } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { Public } from 'src/providers/guard.providers';

@Controller('auth')
export class AuthController {
  constructor(private readonly Services: AuthServices) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.Services.login(loginDto);
  }
}
