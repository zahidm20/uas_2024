import { IsString, IsInt, Min, IsOptional } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class CreateBarangDto {
  @IsString()
  nama: string;

  @IsInt()
  @Min(0)
  jumlah: number;

  @IsString()
  jenis: string;

  @IsString()
  kondisi: string;
}


export class findAllPendataanDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  jenis: string;
}
