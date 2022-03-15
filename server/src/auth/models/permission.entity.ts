import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
