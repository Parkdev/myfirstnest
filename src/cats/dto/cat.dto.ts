import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 'YourId',
    description: 'ID',
  })
  id: string;

  //   @ApiProperty({
  //     example: 'amamov@kakao.com',
  //     description: 'email',
  //   })
  //   email: string;

  //   @ApiProperty({
  //     example: 'amamov',
  //     description: 'name',
  //   })
  //   name: string;
}
