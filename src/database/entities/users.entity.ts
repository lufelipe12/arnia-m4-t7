import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RoleEnum } from '../../users/enums/role.enum';
import { DriverLicenses } from './drivers-licenses.entity';
import { Cars } from './cars.entity';
import { Auctions } from './auctions.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  firstName: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 132, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 132, select: false })
  password: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.buyer })
  role: RoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => DriverLicenses, (dl) => dl.user)
  driverLicense: DriverLicenses;

  @OneToMany(() => Cars, (cars) => cars.user)
  cars: Cars[];

  @ManyToMany(() => Auctions, (auctions) => auctions.users, {
    onDelete: 'CASCADE',
  })
  auctions: Auctions[];

  @BeforeInsert()
  async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Error on password hashing');
    }
  }
}
