import { User } from '../../modules/user/user.entity';
import { IAuthRequest } from '../../interfaces/user.interface';

export const getUserFromReq = (req: IAuthRequest): User => {
  const { user }: { user: User } = req;
  return user;
};
