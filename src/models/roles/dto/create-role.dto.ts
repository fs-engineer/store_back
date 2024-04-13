import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ROLENAME', description: 'Role name' })
  readonly name: string;
  @ApiProperty({
    example: 'Some role description',
    description: 'Role description',
  })
  readonly description: string;
}
