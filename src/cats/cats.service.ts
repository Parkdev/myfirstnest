import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  hiToCats(): string {
    return 'Hello Cats!';
  }
}
