import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Penjualan } from '../penjualan/penjualan.entity';
import { User } from '../auth/auth.entity';

@Entity('detailpenjualan')
export class DetailPenjualan {
  @PrimaryGeneratedColumn()
  detailID: number;

  @Column()
  penjualanID: number;

  @Column()
  produkID: number;

  @Column()
  jumlahProduk: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Penjualan, (penjualan) => penjualan.detailPenjualan)
  penjualan: Penjualan;

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
