import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class ParamsDto {
    @IsOptional()
    @IsString()
    readonly query?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    readonly page?: number;
}
