import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), // 전략에 대한 기본적인 설정

    JwtModule.register({
      // JWT모듈에 대한 설정
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),

    forwardRef(() => CatsModule), // CatsModule을 import하면 해당 모듈에 등록된 CatsRepository를 사용할 수 있음
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
