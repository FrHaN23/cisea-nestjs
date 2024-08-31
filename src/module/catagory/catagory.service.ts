import { Injectable } from '@nestjs/common';

@Injectable()
export class CatagoryServices {
  getHello(): string {
    return 'Hello World!';
  }
}
