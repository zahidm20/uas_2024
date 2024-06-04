import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Produk } from './produk.entity';
import { CreateProdukDto, UpdateProdukDto, findAllProduk } from './produk.dto';
import BaseResponse from 'src/utils/response/base.response';
import { ResponseSuccess } from 'src/interface';

@Injectable()
export class ProdukService extends BaseResponse {
  constructor(
    @InjectRepository(Produk)
    private readonly produkRepository: Repository<Produk>,
  ) {
    super();
  }

  async findAll(query: findAllProduk): Promise<ResponseSuccess> {
    const { page, pageSize, limit, NamaProduk } = query;

    const filterQuery: any = {};
    if (NamaProduk) {
      filterQuery.NamaProduk = Like(`%${NamaProduk}%`);
    }

    const total = await this.produkRepository.count({ where: filterQuery });

    console.log('Qwery', filterQuery);

    const result = await this.produkRepository.find({
      where: filterQuery,
      select: {
        ProdukID: true,
        NamaProduk: true,
        Harga: true,
        Stok: true,
        created_at: true,
        updated_at: true,
        created_by: {
          id:true,
          nama:true,

        },
        updated_by: {
          id:true,
          nama: true
        }
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('Okeh', result, total, page, pageSize);
  }

  async findOne(id: number): Promise<Produk | undefined> {
    const produk = await this.produkRepository.findOne({
      where: { ProdukID: id },
    });
    if (!produk) {
      throw new NotFoundException(`Produk with ID ${id} not found`);
    }
    return produk;
  }

  async create(createProdukDto: CreateProdukDto): Promise<ResponseSuccess> {
    const newProduk = this.produkRepository.create(createProdukDto);
    const result = await this.produkRepository.save(newProduk);

    return this._success('oke', result);
  }

  async update(
    id: number,
    updateProdukDto: UpdateProdukDto,
  ): Promise<Produk | undefined> {
    await this.produkRepository.update(id, { ...updateProdukDto });
    const updatedProduk = await this.produkRepository.findOne({
      where: { ProdukID: id },
    });
    if (!updatedProduk) {
      throw new NotFoundException(`Produk with ID ${id} not found`);
    }
    return updatedProduk;
  }

  async remove(id: number): Promise<void> {
    const result = await this.produkRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produk with ID ${id} not found`);
    }
  }
}
