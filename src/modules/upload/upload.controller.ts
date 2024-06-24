import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('/images')
    @UseInterceptors(FilesInterceptor('images'))
    async uploadImages(@UploadedFiles() images: Array<Express.Multer.File>, @Body('productId') productId: number) {
        const response = await this.uploadService.uploadImages(images, productId);
        return response;
    }
}
