import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Pembelian } from './pembelian.entity';
import { CreatePembelianDto, findAllPembelianDto } from './pembelian.dto';
import { ResponsePagination } from 'src/interface';

@Injectable()
export class PembelianService {
  _pagination: any;
  constructor(
    @InjectRepository(Pembelian)
    private pembelianRepository: Repository<Pembelian>,
  ) {}

  findAll(): Promise<Pembelian[]> {
    return this.pembelianRepository.find();
  }

  async findOne(id: number): Promise<Pembelian> {
    const pembelian = await this.pembelianRepository.findOneBy({ id });
    if (!pembelian) {
      throw new NotFoundException(`Pembelian with ID ${id} not found`);
    }
    return pembelian;
  }

  async create(createPembelianDto: CreatePembelianDto): Promise<Pembelian> {
    const pembelian = this.pembelianRepository.create(createPembelianDto);
    return this.pembelianRepository.save(pembelian);
  }

  async update(
    id: number,
    updatePembelianDto: CreatePembelianDto,
  ): Promise<Pembelian> {
    await this.pembelianRepository.update(id, updatePembelianDto);
    const updatedPembelian = await this.pembelianRepository.findOneBy({ id });
    if (!updatedPembelian) {
      throw new NotFoundException(`Pembelian with ID ${id} not found`);
    }
    return updatedPembelian;
  }

  async remove(id: number): Promise<void> {
    const pembelian = await this.findOne(id);
    await this.pembelianRepository.remove(pembelian);
  }
  async getList(query: findAllPembelianDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama} = query;

    const filterQuery: any = {};
    if (nama) {
      filterQuery.nama = Like(`%${nama}%`);
    }

    const total = await this.pembelianRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.pembelianRepository.find({
      where: filterQuery,
      select: {
        nama: true,
        deskripsi: true,
        harga: true,
        stok: true,
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
}
