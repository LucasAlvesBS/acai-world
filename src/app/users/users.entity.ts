import { Role } from '../../config/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', length: '255' })
  fullName: string;

  @Column({ length: '255', unique: true })
  email: string;

  @Column({ length: '255', unique: true })
  cpf: string;

  @Column({ length: '255' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Owner })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
