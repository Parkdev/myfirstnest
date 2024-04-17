import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰추출
      secretOrKey: 'secretKey', //임시적, 나중에 환경변수로 기입예정 | 생성시 키와 동일해야한다.
      ignoreExpiration: false, // JWT만료기간 유지 여부 (false: 만료시간이 지나면 401에러 발생)
    });
  }

  //   async validate(payload) {
  //     jwt payload를 뽑아냈다면 유효성 검사를 진행하는 메서드
  //   }
}
