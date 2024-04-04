import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

// 1차 path
@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 2차 path
  @Get('blue/:id/:name')
  getHello(
    @Req() req: Request,
    @Body() body,
    @Param param: { id: string; name: string },
  ): string {
    console.log(param);
    return this.appService.getHello();
  }
}
