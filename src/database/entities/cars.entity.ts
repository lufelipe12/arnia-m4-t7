import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { CarPhotos } from './car-photos.entity';

@Entity('cars')
export class Cars {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  model: string;

  @Column({ type: 'varchar', length: 64 })
  brand: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'varchar', length: 32 })
  color: string;

  @Column({ type: 'bool', default: false, nullable: true })
  hasFine: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CarPhotos, (cf) => cf.car)
  carPhotos: CarPhotos;

  @ManyToOne(() => Users, (user) => user.cars, { onDelete: 'SET NULL' })
  user: Users;
}
