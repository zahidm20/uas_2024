import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Barang } from './pendataan.entity';
import { CreateBarangDto, findAllPendataanDto } from './pendataan.dto';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination } from 'src/interface';

@Injectable()
export class PendataanBarangService extends BaseResponse {
  constructor(
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
  ) {
    super()
  }

  async findAll(query: findAllPendataanDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, jenis} = query;

    const filterQuery: any = {};
    if (jenis) {
      filterQuery.jenis = Like(`%${jenis}%`);
    }

    const total = await this.barangRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.barangRepository.find({
      where: filterQuery,
      select: {
        jenis: true,
        jumlah: true,
        kondisi:true,
        nama:true,

        created_at: true,
        updated_at: true,
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true
        }
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }

  findOne(id: string): Promise<Barang> {
    return this.barangRepository.findOneBy({ id: Number(id) });
  }

  create(createBarangDto: CreateBarangDto): Promise<Barang> {
    const barang = new Barang();
    barang.nama = createBarangDto.nama;
    barang.jumlah = createBarangDto.jumlah;
    barang.jenis = createBarangDto.jenis;
    barang.kondisi = createBarangDto.kondisi;

    return this.barangRepository.save(barang);
  }

  async update(id: string, updateBarangDto: CreateBarangDto): Promise<Barang> {
    const barang = await this.barangRepository.findOneBy({ id: Number(id) });
    if (!barang) {
      throw new Error('Barang not found');
    }
    barang.nama = updateBarangDto.nama;
    barang.jumlah = updateBarangDto.jumlah;
    barang.jenis = updateBarangDto.jenis;
    barang.kondisi = updateBarangDto.kondisi;

    return this.barangRepository.save(barang);
  }

  async remove(id: string): Promise<void> {
    await this.barangRepository.delete(Number(id));
  }
}
