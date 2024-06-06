import { IsOptional, IsString } from 'class-validator';

export class QueryDto {
    @IsOptional()
    @IsString()
    readonly query?: string;

    @IsOptional()
    @IsString()
    readonly page?: string;

    @IsOptional()
    @IsString()
    readonly pageSize?: string;
}
