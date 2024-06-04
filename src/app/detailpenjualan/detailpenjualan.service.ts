import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DetailPenjualan } from './detailpenjualan.entity';
import {
  CreateDetailPenjualanDto,
  DetailPenjualanDto,
  findAllDetailPenjualanDto,
} from './detailpenjualan.dto';
import { ResponsePagination } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class DetailPenjualanService extends BaseResponse {
  constructor(
    @InjectRepository(DetailPenjualan)
    private readonly detailPenjualanRepository: Repository<DetailPenjualan>,
  ) {
    super();
  }

  findAll(): Promise<DetailPenjualanDto[]> {
    return this.detailPenjualanRepository.find();
  }

  findOne(id: number): Promise<DetailPenjualanDto> {
    return this.detailPenjualanRepository.findOne({ where: { detailID: id } });
  }

  async create(
    createDetailPenjualanDto: CreateDetailPenjualanDto,
  ): Promise<DetailPenjualanDto> {
    const detailPenjualan = new DetailPenjualan();
    detailPenjualan.penjualanID = createDetailPenjualanDto.penjualanID;
    detailPenjualan.produkID = createDetailPenjualanDto.produkID;
    detailPenjualan.jumlahProduk = createDetailPenjualanDto.jumlahProduk;
    detailPenjualan.subtotal = createDetailPenjualanDto.subtotal;

    const result = await this.detailPenjualanRepository.save(detailPenjualan);
    return result;
  }
  async getList(query: findAllDetailPenjualanDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, penjualanID } = query;

    const filterQuery: any = {};
    if (penjualanID) {
      filterQuery.penjualanID = Like(`%${penjualanID}%`);
    }

    const total = await this.detailPenjualanRepository.count({
      where: filterQuery,
    });

    console.log('Qwery', filterQuery);

    const result = await this.detailPenjualanRepository.find({
      where: filterQuery,
      select: {
        detailID: true,
        penjualanID: true,
        produkID: true,
        jumlahProduk: true,
        subtotal: true,
        created_at: true,
        updated_at: true,
        created_by: {
          id: true, // pilih field  yang akan ditampilkan dari tabel user
          nama: true,
        },
        updated_by: {
          id: true, // pilih field yang akan ditampilkan dari tabel user
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }
}
