import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StokBarangService } from './stok.service';
import { CreateStokBarangDto, UpdateStokBarangDto, findAllStokDto } from './stok.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('stok-barang')
export class StokBarangController {
  constructor(private readonly stokBarangService: StokBarangService) {}

  @Get('list')
  async findAll(@Pagination() query: findAllStokDto) {
    // console.log(query)
    return this.stokBarangService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stokBarangService.findOne(id);
  }

  @Post('create')
  create(@Body() createStokBarangDto: CreateStokBarangDto) {
    return this.stokBarangService.create(createStokBarangDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateStokBarangDto: UpdateStokBarangDto,
  ) {
    return this.stokBarangService.update(id, updateStokBarangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.stokBarangService.remove(id);
  }
}
