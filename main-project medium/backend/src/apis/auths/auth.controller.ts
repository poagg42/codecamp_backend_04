import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthsService } from './auths.service';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: {
    email: string;
    hashedPassword: string;
    name: string;
    age: number;
  };
}

@Controller()
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google')) // 전환될 페이지 주소
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.loginAuth({ req, res });
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.loginAuth({ req, res });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao')) // 전환될 페이지 주소
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.loginAuth({ req, res });
  }
}
