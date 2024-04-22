import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './service/cats.service';
import { Cat, CatSchema } from './cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';

@Module({
  imports: [
    //파일 전송을 위한 MulterModule 등록
    MulterModule.register({
      dest: './upload', //destination
    }),
    // Cat 모델을 사용하기 위해 스키마와 함께 등록
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema }, // 의존성 추가
      { name: Cat.name, schema: CatSchema },
    ]),
    // 순환 참조 방지를 위해 forwardRef() 사용
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
