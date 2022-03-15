import { Blog } from 'src/blog/model/blog.interface';
import { Role } from 'src/auth/models/role.inteface';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: Role;
  profileImage?: string;
  blogs?: Blog[];
}
