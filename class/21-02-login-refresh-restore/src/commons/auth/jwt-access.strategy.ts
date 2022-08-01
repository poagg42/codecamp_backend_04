import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { identity } from 'rxjs';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   jwtFromRequest: (req) => {
      //     const accessToken = req.headers.Authorization; // "Bearer" playground에서 access token이 들어가야 한다.
      //     const result = accessToken.replace('Bearer ', '');
      //     return result;
      //   },
      secretOrKey: 'myAccessKey',
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
