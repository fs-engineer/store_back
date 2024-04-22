import { User } from '../modules/user/user.entity';

export interface IAuthRequest extends Request {
  user: User;
}
