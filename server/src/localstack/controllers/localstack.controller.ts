import {
  Post,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Controller,
  Res,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { response } from 'express';

import { ImageFileDTO, ImageResponseDTO } from '../dto/imageUploadDTO';
import { LocalstackService } from '../services/localstack.service';

@Controller('localstack')
export class LocalstackController {
  constructor(private readonly uploadImageService: LocalstackService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image', { limits: { files: 1 } }))
  @ApiResponse({ status: HttpStatus.CREATED, type: ImageResponseDTO })
  async upload(@UploadedFile() file: ImageFileDTO, @Res() response) {
    try {
      const data: ImageResponseDTO = await this.uploadImageService.upload(file);
      return response.status(200).json({
        message: `Image ${file.originalname} uploaded to S3`,
        data,
      });
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image to S3: ${error.message}`);
    }
  }

  @Get(':imgKey')
  get(@Param('imgKey') imgKey: string, @Res() response) {
    try {
      const readStream = this.uploadImageService.getImageFromS3(imgKey);
      return readStream.pipe(response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to get image to S3: ${error.message}`);
    }
  }
}
