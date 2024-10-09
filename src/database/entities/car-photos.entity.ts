import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cars } from './cars.entity';

@Entity('car-photos')
export class CarPhotos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 264 })
  url: string;

  @ManyToOne(() => Cars, (cars) => cars.carPhotos, { onDelete: 'CASCADE' })
  car: Cars;
}
