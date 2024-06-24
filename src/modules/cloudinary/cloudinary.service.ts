import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadFile(file: Express.Multer.File, folder: string = 'images'): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { resource_type: 'image', folder },
                    (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                        if (error) {
                            return reject(error);
                        }
                        if (!result) {
                            return reject(new Error('Upload result is undefined'));
                        }
                        resolve(result);
                    },
                )
                .end(file.buffer);
        });
    }
}
