import { User } from 'src/user/models/user.interface';

export interface Blog {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  content?: string;
  body?: string;
  imgUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  author?: User;
  headerImage?: string;
  publishedDate?: Date;
  isPublished?: boolean;
}
