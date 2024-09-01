import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { District } from './district.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ unique: true, length: 10 })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nama: string;

  @Column()
  role: number;

  @Column({ nullable: true })
  district_id?: number;
  @OneToOne(() => District, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district?: District;
}
