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

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(user?: Partial<UsersEntity>) {
    this.id = user?.id;
    this.fullName = user?.fullName;
    this.email = user?.email;
    this.cpf = user?.cpf;
    this.password = user?.password;
    this.isAdmin = user?.isAdmin;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }
}
