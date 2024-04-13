import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty({ example: 'ROLENAME', description: 'Role name' })
  readonly name: string;

  @IsString()
  @ApiProperty({
    example: 'Some role description',
    description: 'Role description',
  })
  readonly description: string;
}
