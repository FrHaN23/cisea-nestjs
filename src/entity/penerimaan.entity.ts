import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { District } from './district.entity';
import { User } from './user.entity';

@Entity()
export class Penerimaan {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ nullable: true })
  date?: Date;

  @Column({ type: 'bigint' })
  value: number;

  @Column()
  category_id?: number;
  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column()
  district_id?: number;
  @ManyToOne(() => District, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district?: Category;

  @Column()
  user_id?: number;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
