import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductImage } from '../product-image/product-image.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductImageDto } from '../product-image/dto/create-product-image.dto';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        @InjectModel(ProductImage) private readonly productImageModel: typeof ProductImage,
    ) {}

    async uploadImages(images: Array<Express.Multer.File>, productId: number) {
        try {
            let imageURLsData: CreateProductImageDto[] = [];
            const uploadResults: UploadApiResponse[] = await Promise.all(
                images.map((image) => this.cloudinaryService.uploadFile(image)),
            );
            console.log(uploadResults);
            if (uploadResults && Array.isArray(uploadResults) && uploadResults.length > 0) {
                imageURLsData = uploadResults.map((result) => ({ secureUrl: result.secure_url, productId }));
            }

            const URLs = await this.productImageModel.bulkCreate(imageURLsData);
            return { status: HttpStatus.CREATED, message: `Created ${uploadResults.length} images`, rows: URLs };
        } catch (e) {
            return new HttpException('Something went wrong, try again', HttpStatus.BAD_REQUEST);
        }
    }
}
