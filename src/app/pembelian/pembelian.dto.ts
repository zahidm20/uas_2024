import { IsString, IsInt, Min, IsPositive, IsOptional, Length } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class CreatePembelianDto {
  @IsString()
  nama: string;

  @IsString()
  deskripsi: string;

  @IsInt()
  @IsPositive()
  harga: number;

  @IsInt()
  @Min(0)
  stok: number;
}

export class UpdatePelangganDto {
  @IsString()
  @IsOptional()
  @Length(1, 255) nama?: string;

  @IsString()
  @IsOptional() deskripsi?: string;

  @IsString()
  @IsOptional()
  @Length(1, 15)
   harga?: number;
}

export class findAllPembelianDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama: string;
}

