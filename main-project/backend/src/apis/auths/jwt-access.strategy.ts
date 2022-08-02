import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
  constructor() {
    super({
      JwtAccessStrategy: ExtractJwt.fromAuthHeaderAsBearerToken(), //
      secretOrKey: 'myAccessKey',
    });
  }

  validate(payload) {
    console.log(payload); //
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
