import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './users.entity';

@Entity('driverLicenses')
export class DriverLicenses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 132, unique: true })
  code: string;

  @Column({ type: 'date' })
  expirationDate: Date;

  @OneToOne(() => Users, (users) => users.driverLicense, { nullable: false })
  @JoinColumn()
  user: Users;
}
