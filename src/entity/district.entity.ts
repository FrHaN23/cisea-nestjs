import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.district)
  user?: User;
}
