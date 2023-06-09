/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-31 01:11:57
 * @LastEditTime: 2023-03-31 02:05:27
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\strategies\jwt.strategy.ts
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('payload-payload', payload);

    return { id: payload.id, username: payload.username };
  }
}
