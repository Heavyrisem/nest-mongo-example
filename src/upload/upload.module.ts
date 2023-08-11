import { Module } from '@nestjs/common';

import { ConfigurationModule } from '~modules/config/config.module';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
