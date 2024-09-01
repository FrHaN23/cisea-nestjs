import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
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

  @Column({ type: 'bigint' })
  value: number;

  @Column()
  category_id?: number;
  @OneToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column()
  district_id?: number;
  @OneToOne(() => District, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district?: Category;

  @Column()
  user_id?: number;
  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
