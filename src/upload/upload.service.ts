import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly S3: S3Client;

  constructor(private readonly configService: ConfigService) {
    // S3 연결을 위한 정보 세팅
    this.S3 = new S3Client({
      region: configService.getOrThrow('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: configService.getOrThrow('AWS_BUCKET_ACCESS_KEY'),
        secretAccessKey: configService.getOrThrow('AWS_BUCKET_PRIVATE_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const params: PutObjectCommandInput = {
      Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'), // 버킷 이름
      Key: `${new Date().toISOString()}.${file.originalname}`, // 파일이름
      Body: file.buffer, // 파일 데이터
    };

    await this.S3.send(new PutObjectCommand(params));
    return `https://${this.configService.getOrThrow('AWS_BUCKET_NAME')}.s3.amazonaws.com/${
      params.Key
    }`;
  }
}
