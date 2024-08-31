import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Catagory {
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

  @Column({ type: 'decimal' })
  kota: number;

  @Column({ type: 'decimal' })
  kab: number;

  @Column({ type: 'decimal' })
  pusat: number;
}
