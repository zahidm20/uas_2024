import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Penjualan } from './penjualan.entity';
import { CreatePenjualanDto, PenjualanDto } from './penjualan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

@Injectable()
export class PenjualanService extends BaseResponse {
  constructor(
    @InjectRepository(Penjualan)
    private readonly penjualanRepository: Repository<Penjualan>,
  ) {
    super();
  }

  async findAll(): Promise<ResponseSuccess> {
    const result = await this.penjualanRepository.find();
    return this._success('oke', result);
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.penjualanRepository.findOne({
      where: { penjualanID: id },
    });
    return this._success('oke', result);
  }

  async create(
    createPenjualanDto: CreatePenjualanDto,
  ): Promise<ResponseSuccess> {
    const penjualan = new Penjualan();
    penjualan.tanggalPenjualan = createPenjualanDto.tanggalPenjualan;
    penjualan.totalHarga = createPenjualanDto.totalHarga;
    penjualan.pelangganID = createPenjualanDto.pelangganID;

    const result = await this.penjualanRepository.save(penjualan);
    return this._success('oke', result);
  }

  async getAllTugas(query: PenjualanDto): Promise<ResponsePagination> {
    const { page = 1, pageSize = 10, tanggalPenjualan } = query;

    const filterQuery: any = {};
    if (tanggalPenjualan) {
      filterQuery.tanggalPenjualan = Like(`%${tanggalPenjualan}%`);
    }

    const total = await this.penjualanRepository.count({ where: filterQuery });

    const skip = (page - 1) * pageSize;

    const result = await this.penjualanRepository.find({
      where: filterQuery,
      relations: ['jurusan', 'updated_by_mahasiswa'],
      select: {
        penjualanID: true,
        tanggalPenjualan: true,
        totalHarga: true,
        pelangganID: true,
        created_at: true,
        updated_at: true,
        created_by: {
          id:true,
          nama:true,
        },
        updated_by: {
          id:true,
          nama:true,
          
        }
      },
      skip,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }
}
