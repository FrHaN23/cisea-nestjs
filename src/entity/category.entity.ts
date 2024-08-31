import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column()
  name: string;

  @Column({ type: 'decimal', nullable: true })
  kota?: number;

  @Column({ type: 'decimal', nullable: true })
  kab?: number;

  @Column({ type: 'decimal', nullable: true })
  pusat?: number;

  @Column({ nullable: true })
  parent_id?: number;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  @JoinColumn({ name: 'parent_id' })
  children: Category[];
}
