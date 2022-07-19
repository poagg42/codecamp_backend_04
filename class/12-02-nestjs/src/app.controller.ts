import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //nest.js 한테 해달라고 한다. 우리가 하나하나 만들 필요가 없다.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/boards') //Get 방식의 API가 된다 app.get 과 비슷
  getHello(): string {
    return this.appService.getHello();
  }
}
