import { User } from 'src/user/models/user.interface';

export interface Task {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
  assignedPerson?: User;
  headerImage?: string;
  publishedDate?: Date;
  isPublished?: boolean;
}
