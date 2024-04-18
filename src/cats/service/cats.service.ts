import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';

// 몽구스 schema import
import { Cat } from '../cats.schema';
import { Model } from 'mongoose';

// encript
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }

  // 고양이 url 저장
  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    // 파일 이름을 가져와서
    const fileName = `cats/${files[0].filename}`;
    console.log('filename: ', fileName);
    // 파일 이름을 업데이트하고
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log('newCat: ', newCat);
    // 업데이트된 고양이를 반환한다.
    return newCat;
  }
}
