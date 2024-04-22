import { Prop, Schema, SchemaFactory, InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

// 스키마 옵션
const options: SchemaOptions = {
  timestamps: true,
};

// 스키마 정의
@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'amamov@kakao.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'amamov',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    requried: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

// 클래스를 스키마로
// export const CatSchema = SchemaFactory.createForClass(Cat);

// // 데이터 리턴용 가상 필드
// CatSchema.virtual('readOnlyData').get(function (this: Cat) {
//   return {
//     id: this.id,
//     email: this.email,
//     name: this.name,
//     imgUrl: this.imgUrl,
//   };
// });

// Comment 연결 가상 스키마 연결
const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments', // 연결할 스키마 이름 (실제하는 컬랙션 네임)
  localField: '_id', // 현재 컬랙션의 필드 기준
  foreignField: 'info', // 연결할 컬랙션의 필드 기준
});

// populate
// mongoose에서 가상 필드를 사용하기 위해 toObject, toJSON 옵션 추가
// owner 필드를 가상 필드로 자동으로 추가
_CatSchema.set('toObject', { virtuals: true }); // 모델 인스턴스를 js객체로 변환할때 가상 필드를 포함
_CatSchema.set('toJSON', { virtuals: true }); // 모델 인스턴스를 json으로 변환할때 가상 필드를 포함

export const CatSchema = _CatSchema;
