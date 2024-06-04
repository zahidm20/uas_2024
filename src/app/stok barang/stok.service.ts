import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { StokBarang } from './stok.entity';
import { CreateStokBarangDto, UpdateStokBarangDto, findAllStokDto } from './stok.dto';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination } from 'src/interface';

@Injectable()
export class StokBarangService extends BaseResponse {
  constructor(
    @InjectRepository(StokBarang)
    private readonly stokBarangRepository: Repository<StokBarang>,
  ) {
    super()
  }

  async findAll(query: findAllStokDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama_barang} = query;

    const filterQuery: any = {};
    if (nama_barang) {
      filterQuery.nama_barang = Like(`%${nama_barang}%`);
    }

    const total = await this.stokBarangRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.stokBarangRepository.find({
      where: filterQuery,
      select: {
        nama_barang: true,
        deskripsi:true,
        harga:true,
        Idbarang:true,
        kategori_barang:true,
        stok_tersedia:true,
        tanggal_diperbarui:true,
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


  findOne(id: number): Promise<StokBarang> {
    return this.stokBarangRepository.findOneBy({ Idbarang: id });
  }

  create(createStokBarangDto: CreateStokBarangDto): Promise<StokBarang> {
    const stokBarang = this.stokBarangRepository.create(createStokBarangDto);
    return this.stokBarangRepository.save(stokBarang);
  }

  async update(
    id: number,
    updateStokBarangDto: UpdateStokBarangDto,
  ): Promise<StokBarang> {
    await this.stokBarangRepository.update(id, updateStokBarangDto);
    return this.stokBarangRepository.findOneBy({ Idbarang: id });
  }

  async remove(id: number) {
    const data = await this.stokBarangRepository.delete(id);
    return {
      messege: 'data berhasil di hapus',
      data: data,
    };
  }
}
