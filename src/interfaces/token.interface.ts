import { Role } from '../modules/role/entity/role.entity';

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    id: number;
    email: string;
    roles: Role[];
}
