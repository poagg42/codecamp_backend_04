import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // 에러 발생 시 다시는 발생하지 않도록 검증하는 코드를 여기다 작성한다.
    return this.appService.getHello();
  }
}
