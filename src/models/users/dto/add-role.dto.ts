import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 'SOMEROLE',
    description: 'Some role name',
  })
  readonly name: string;

  @ApiProperty({
    example: '123',
    description: 'userId',
  })
  readonly userId: number;
}
