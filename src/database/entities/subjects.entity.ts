import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity('subjects')
export class Subjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  name: string;

  @Column({ type: 'int', unique: true })
  code: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  credits: number;

  @Column({ type: 'varchar', length: 64 })
  campus: string;

  @Column({ type: 'varchar', length: 32 })
  classRoom: string;

  @ManyToOne(() => Users, (users) => users.subjects, { onDelete: 'SET NULL' })
  instructor: Users;

  @ManyToMany(() => Users, (users) => users.classes, { onDelete: 'CASCADE' })
  @JoinTable()
  students: Users[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
