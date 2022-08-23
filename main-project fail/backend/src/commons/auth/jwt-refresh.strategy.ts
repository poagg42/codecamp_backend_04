import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },

      //   jwtFromRequest: (req) => {
      //     const accessToken = req.headers.Authorization; // "Bearer" playground에서 access token이 들어가야 한다.
      //     const result = accessToken.replace('Bearer ', '');
      //     return result;
      //   },
      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    console.log(payload); // { email: c@c.com, sub: adsfjliafd123ljadfs}

    const refreshToken = req.headers.cookie.slice(13);
    const mycache2 = await this.cacheManager.get(
      `refreshToken:${refreshToken}`,
    );
    const result = {
      email: payload.email,
      _code: payload.sub,
    };

    if (mycache2) {
      throw new UnauthorizedException('이미 로그아웃을 했습니다.');
    } else return result;
  }
}
