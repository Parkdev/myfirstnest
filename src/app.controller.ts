import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

// 1차 path
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 2차 path
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
