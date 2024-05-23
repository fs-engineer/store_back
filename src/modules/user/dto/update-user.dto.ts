import { CreateUserDto } from './create-user.dto';

// TODO need to add swagger
export class UpdateUserDto extends CreateUserDto {
    name?: string;
    lastName?: string;
    number?: string;
    birthday?: Date;
    newPassword?: number;
}
