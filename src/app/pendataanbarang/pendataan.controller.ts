import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PendataanBarangService } from './pendataan.service';
import { CreateBarangDto, findAllPendataanDto } from './pendataan.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('barang')
export class PendataanBarangController {
  constructor(
    private readonly pendataanBarangService: PendataanBarangService,
  ) {}

  @Get('list')
  async findAll(@Pagination() query: findAllPendataanDto) {
    // console.log(query)
    return this.pendataanBarangService.findAll(query);
  }

  @Get(':id')
  getBarangById(@Param('id') id: string) {
    return this.pendataanBarangService.findOne(id);
  }

  @Post('create')
  createBarang(@Body() createBarangDto: CreateBarangDto) {
    return this.pendataanBarangService.create(createBarangDto);
  }

  @Put(':id')
  updateBarang(
    @Param('id') id: string,
    @Body() updateBarangDto: CreateBarangDto,
  ) {
    return this.pendataanBarangService.update(id, updateBarangDto);
  }

  @Delete(':id')
  deleteBarang(@Param('id') id: string) {
    return this.pendataanBarangService.remove(id);
  }
}


