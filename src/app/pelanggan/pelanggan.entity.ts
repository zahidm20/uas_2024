import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity('pelanggan')
export class Pelanggan {
  @PrimaryGeneratedColumn()
  pelangganID: number;

  @Column({ length: 255 })
  namaPelanggan: string;

  @Column('text')
  alamat: string;

  @Column({ length: 15 })
  nomorTelepon: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  @ManyToOne(() => Pelanggan, (pelanggan) => pelanggan.pelanggan)
  pelanggan: Pelanggan;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })   //buat relasi many to one  dengan table user
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })  //buat relasi many to one  dengan table user
  updated_by: User;
}
