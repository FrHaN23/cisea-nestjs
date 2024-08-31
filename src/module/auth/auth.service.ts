import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm/repository/Repository';
import { User } from 'src/entity/user.entity';
import { comparePasswords } from 'src/utils/password.utils';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthServices {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repos: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credential: LoginDto): Promise<User> {
    const user = await this.repos.findOne({
      where: {
        username: credential.username,
      },
    });
    if (user && (await comparePasswords(credential.password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
