import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request.cookies['token'];
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY')
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}