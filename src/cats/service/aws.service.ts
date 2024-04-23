import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import * as path from 'path';
import { fileURLToPath } from 'url';

@Injectable()
export class AwsService {
  private readonly awsS3 = new AWS.S3();
  public readonly S3_BUCKET_NAME: string;

  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      region: this.configService.get('AWS_S3_REGION'),
    });
    this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadFileToS3(
    folder: string, // 어떤 폴더에
    file: Express.Multer.File, // 받은 Multer File을
  ): Promise<{
    key: string; // key를 리턴
    s3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>; // s3Object로 저장하고
    contentType: string; // contentType도 반환
  }> {
    try {
      // 폴더명/현재시간_파일명
      const key = `${folder}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, ''); // 공백 제거

      const s3Object = await this.awsS3 // S3에 업로드 이후 s3Object로 반환
        .putObject({
          Bucket: this.S3_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise(); // promise 형식으로 받기 위해 추가 | 없으면 콜백으로 전달한다.
      return { key, s3Object, contentType: file.mimetype };
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  async deleteS3Object(
    key: string,
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
  ): Promise<{ success: true }> {
    try {
      await this.awsS3
        .deleteObject(
          {
            Bucket: this.S3_BUCKET_NAME, // 버켓명
            Key: key, // 파일 명
          },
          callback,
        )
        .promise();
      return { success: true };
    } catch (error) {
      throw new BadRequestException(`Filed to delete file : ${error}`);
    }
  }
  //* 파일이 어디 저장되어있는지 알려주는 오브젝트 키
  public getAwsS3FileUrl(objectKey: string) {
    return `https://${this.S3_BUCKET_NAME}.s3.amazonaws.com/${objectKey}`;
  }
}
