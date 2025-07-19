import { IsString, minLength } from 'class-validator';
import { Role } from 'src/auth/enums/rol.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: Role.USER })
  role: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
