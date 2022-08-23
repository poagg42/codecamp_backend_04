import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { access } from 'fs';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   jwtFromRequest: (req) => {
      //     const accessToken = req.headers.Authorization; // "Bearer" playground에서 access token이 들어가야 한다.
      //     const result = accessToken.replace('Bearer ', '');
      //     return result;
      //   },
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // { email: c@c.com, sub: adsfjliafd123ljadfs}
    console.log('0000000000000');

    const accessToken = req.headers.authorization.slice(7);
    const mycache1 = await this.cacheManager.get(`accessToken:${accessToken}`);
    const result = {
      email: payload.email,
      _code: payload.sub,
    };
    console.log(accessToken);
    console.log('1234567');
    console.log(mycache1);

    if (mycache1) {
      throw new UnauthorizedException('이미 로그아웃을 했습니다.');
    }

    return result;
  }
}
