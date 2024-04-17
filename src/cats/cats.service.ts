import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';

// 몽구스 schema import
import { Cat } from './cats.schema';
import { Model } from 'mongoose';

// encript
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepositry: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepositry.existsByEmail(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepositry.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }
}
