import { Breed } from '../../breeds/entities/breed.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Cat {
  @Column({ generated: true, primary: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => Breed, (breed) => breed.id, { eager: true })
  breed: Breed;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;
}
