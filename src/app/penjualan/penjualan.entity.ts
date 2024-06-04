import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DetailPenjualan } from '../detailpenjualan/detailpenjualan.entity';
import { User } from '../auth/auth.entity';

@Entity('penjualan')
export class Penjualan {
  @PrimaryGeneratedColumn()
  penjualanID: number;

  @Column({ type: 'date' })
  tanggalPenjualan: string;

  @OneToMany(() => DetailPenjualan, (v) => v.penjualan, {
    cascade: ['insert', 'update'],
  })
  detailPenjualan: DetailPenjualan[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalHarga: number;

  @Column()
  pelangganID: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })   //buat relasi many to one  dengan table user
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })  //buat relasi many to one  dengan table user
  updated_by: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
