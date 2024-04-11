import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    // 여기에 로직을 넣어 처리하면된다.
    // console.log('PositiveIntPipe', value);
    if (value < 0) {
      throw new HttpException('value > 0', 400);
    }
    return value;
  }
}
