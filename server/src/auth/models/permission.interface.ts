export interface Permission {
  id?: number;
  name?: string;
}

export enum UserPermission {
  BLOG = 'blog',
  USER = 'user',
  TASK = 'task',
  ROLE = 'role',
  PERMISSION = 'permission',
}
