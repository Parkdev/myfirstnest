import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: 'YourId',
    description: 'ID',
  })
  id: string;

  @ApiProperty({
    example: 'amamov@kakao.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'amamov',
    description: 'name',
  })
  name: string;
}
