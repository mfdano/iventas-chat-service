import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'FS3tM3Ja9cqP3PFD3zy9LTHzbe4sD7Mq'
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy')
    console.log(JSON.stringify(payload, null, 2))
    return { sucess: 2 };
  }
}