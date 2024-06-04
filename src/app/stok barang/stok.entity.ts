import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity()
export class StokBarang {
  @PrimaryGeneratedColumn()
  Idbarang: number;

  @Column()
  nama_barang: string;

  @Column()
  stok_tersedia: number;

  @Column()
  kategori_barang: string;

  @Column()
  deskripsi: string;

  @Column()
  harga: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  tanggal_diperbarui: Date;

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
