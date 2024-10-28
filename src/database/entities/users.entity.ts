import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadGatewayException } from '@nestjs/common';

import { RoleEnum } from '../../enums/role.enum';
import { Subjects } from './subjects.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  firstName: string;

  @Column({ type: 'varchar', length: 64 })
  lastName: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.S })
  role?: RoleEnum;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToMany(() => Subjects, (subjects) => subjects.instructor)
  subjects: Subjects[];

  @ManyToMany(() => Subjects, (subjects) => subjects.students)
  classes: Subjects[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.error(error);

      throw new BadGatewayException('Error trying to hash password');
    }
  }
}
