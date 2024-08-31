import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServices {
  getHello(): string {
    return 'Hello World!';
  }
}
