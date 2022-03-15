import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BlogEntity } from 'src/blog/model/blog.entity';
import { RoleEntity } from 'src/auth/models/role.entity';
import { Task } from 'src/task/models/task.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @ManyToOne((type) => RoleEntity, (role) => role.users)
  role: RoleEntity;

  // @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  // role: UserRole;

  @OneToMany((type) => Task, (task) => task.assignedPerson)
  task: Task[];

  @OneToMany((type) => BlogEntity, (blogEntity) => blogEntity.author)
  blogs: BlogEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
