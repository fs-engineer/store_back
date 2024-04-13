import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'usermail@gmail.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'useR_PassWord123', description: 'User password' })
  readonly password: string;
}
