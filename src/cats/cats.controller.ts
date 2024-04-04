import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { get } from 'http';

@Controller('cats')
export class CatsController {
  //의존성 주입
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  getAllCats() {
    return 'all cats';
  }

  // cats/:id
  @Get(':id')
  getOneCat() {
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
