import { Injectable } from '@nestjs/common';

@Injectable() //주입할 수 있는
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
