import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
