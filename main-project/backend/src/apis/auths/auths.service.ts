import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken = ${refreshToken};`);

    // 배포환경
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken = ${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`)
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    ); //
  }

  async loginAuth({ req, res }) {
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
    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
