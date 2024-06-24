import { Module, Global } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        CloudinaryService,
        {
            provide: 'CLOUDINARY',
            useFactory: (configService: ConfigService) => {
                const cloudName = configService.get<string>('CLOUDINARY_CLOUD_NAME');
                const apiKey = configService.get<string>('CLOUDINARY_API_KEY');
                const apiSecret = configService.get<string>('CLOUDINARY_API_SECRET');

                if (!cloudName || !apiKey || !apiSecret) {
                    throw new Error('Cloudinary configuration variables are missing');
                }

                return cloudinary.config({
                    cloud_name: cloudName,
                    api_key: apiKey,
                    api_secret: apiSecret,
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [CloudinaryService],
})
export class CloudinaryModule {}
