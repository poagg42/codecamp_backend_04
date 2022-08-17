import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @MessagePattern({ qqq: '로그인실행해줘' })
  login123(data) {
    //실제 로그인 하기
    console.log(data);
    return 'login 성공!!';
  }

  logout23152() {
    //
  }

  restoreAccessToken123412() {
    //
  }
}
