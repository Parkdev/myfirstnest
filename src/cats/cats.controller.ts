import {
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
} from '@nestjs/common';
import { get } from 'http';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) // 모든 url에 적용할때
export class CatsController {
  //의존성 주입
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  // @UseFilters(HttpExceptionFilter) // 특정 url에만 적용할때
  getAllCats() {
    throw new HttpException('api broken', 401);
    // node JS 에러처리
    // throw new Error('error');
    // nest js 에러처리
    // throw new HttpException(
    //   {
    //     success: false,
    //     error: 'This is a custom message',
    //   },
    //   403,
    // );
    return this.catsService.hiToCats();
  }

  // cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) params: any) {
    // ParseIntPipe: id를 숫자로 변환 // string으로 들어왔을때 유효성 검사도 겸할 수 있다.
    console.log(params);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
