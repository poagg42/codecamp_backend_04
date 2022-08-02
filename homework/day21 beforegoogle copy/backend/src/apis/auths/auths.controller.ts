import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
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
  constructor(
    private readonly usersService: UsersService, //
    private readonly authsService: AuthsService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google')) // 전환될 페이지 주소
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    let user = await this.usersService.findOne({ email: req.user.email });
    // 2. 회원가입
    if (!user) {
      user = await this.usersService.create({
        ...req.user,
        // email: req.user.email,
        // hashedPassword: req.user.hashedPassword
        // name: req.user.name,
        // age: req.user.age,
      });
    }
    // 3. 로그인(accessToken 만들어서 프론트엔드 주기)
    this.authsService.setRefreshToken({ user, res });
    res.redirect(
      'http://127.0.0.1:5500/homework/day21%20beforegoogle%20copy/frontend/login/index.html',
    );
  }
}
