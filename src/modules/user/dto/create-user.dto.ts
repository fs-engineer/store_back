import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'usermail@gmail.com', description: 'User email' })
  @IsString({ message: 'Email address must be a string' })
  @IsEmail({}, { message: 'Email address must be a valid email address' })
  readonly email: string;

  @ApiProperty({ example: 'useR_PassWord123', description: 'User password' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 16, {
    message: 'The password must be at least 6 and no more than 16 characters',
  })
  readonly password: string;
}
