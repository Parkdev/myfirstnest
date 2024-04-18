import { CatsRepository } from 'src/cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly CatsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰추출
      secretOrKey: process.env.JWT_SECRET, // 생성시 키와 동일해야한다.
      ignoreExpiration: false, // JWT만료기간 무시 여부 (false: 만료시간이 지나면 401에러 발생)
    });
  }

  //jwt payload를 뽑아냈다면 유효성 검사를 진행하는 메서드
  // Guard 실행중에 호출된다.
  async validate(payload: Payload) {
    const cat = await this.CatsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat; // 비밀번호 없는 cat정보 반환 (request.user에 저장됨)
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
