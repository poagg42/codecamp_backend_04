import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authsService: AuthsService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인(이메일이 일치하는 유저를 DB에서 찾기)
    const user = await this.usersService.findOne({ email });
    // 2. 일치하는 유저가 없으면?! 에러 던지기!!!

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    //처리할 수 없는 데이터일 때 쓰는 것

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?!
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 일치하는 유저가 있고, 비밀번호도 맞았다면?!
    // => accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.authsService.getAccessToken({ user });
  }
}
