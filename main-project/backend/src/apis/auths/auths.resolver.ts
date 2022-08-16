import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/type/context';
import { GqlAuthRefreshGuard } from './gql-auth.guard';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authsService: AuthsService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    // 1. 로그인(이메일이 일치하는 유저를 DB에서 찾기)
    const user = await this.usersService.findOne({ email });
    // 2. 일치하는 유저가 없으면?! 에러 던지기!!!

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    //처리할 수 없는 데이터일 때 쓰는 것

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?!
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. refreshToken(=JWT)을 만들어서 프론트엔드 브라우저 쿠키에 저장해서 보내주기
    this.authsService.setRefreshToken({ user, res: context.res });
    // 5. 일치하는 유저가 있고, 비밀번호도 맞았다면?!
    // => accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.authsService.getAccessToken({ user });
  }
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    return this.authsService.getAccessToken({ user: context.req.user });
  }
  //
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: any) {
    // console.log(context.req.headers);

    try {
      const accessToken = context.req.headers.authorization.slice(7);
      const refreshToken = context.req.headers.cookie.slice(13);
      const result: any = jwt.verify(accessToken, 'myAccessKey');
      console.log('result : ', result);
      jwt.verify(refreshToken, 'myRefreshKey'); //accessToken과 refreshToken 검증

      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: result.exp,
      });

      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: result.exp,
        },
      );
      // 2. 캐시에서 조회하는 연습
      const mycache1 = await this.cacheManager.get(
        `accessToken:${accessToken}`,
      );
      const mycache2 = await this.cacheManager.get(
        `refreshToken:${refreshToken}`,
      );
      console.log(mycache1);
      console.log(mycache2);

      return '로그아웃에 성공했습니다.';
    } catch {
      throw new UnauthorizedException('00');
    }
  }
}
