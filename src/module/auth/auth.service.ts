import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm/repository/Repository';
import { User } from 'src/entity/user.entity';
import { comparePasswords } from 'src/utils/password.utils';
import { findUserByUsername } from 'src/utils/user.utils';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthServices {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credential: LoginDto): Promise<any> {
    const user = await findUserByUsername(
      this.userRepository,
      credential.username,
    );
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

    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
