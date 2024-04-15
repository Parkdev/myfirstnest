import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { PositiveIntPipe } from '../pipes/positiveint.pipe';
import { SuccessInterceptor } from './success.intercepter';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // 인터셉터 의존성 주입
@UseFilters(HttpExceptionFilter) // cats/ 에 파생되는 모든 url에 Exception을 적용할때 추가
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }
  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'upload cat img';
  }
}
