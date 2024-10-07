import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './users.entity';

@Entity('auctions')
export class Auctions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  auctionName: string;

  @Column({ type: 'varchar', length: 64 })
  city: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToMany(() => Users, (users) => users.auctions, { onDelete: 'CASCADE' })
  @JoinTable()
  users: Users[];
}
