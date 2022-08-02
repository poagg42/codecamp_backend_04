import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
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
    });
  }

  validate(payload) {
    console.log(payload); // { email: c@c.com, sub: adsfjliafd123ljadfs}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
