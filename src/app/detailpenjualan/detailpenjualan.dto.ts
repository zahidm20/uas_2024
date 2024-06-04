import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class CreateDetailPenjualanDto {
  @IsInt()
  @Min(1)
  readonly penjualanID: number;

  @IsInt()
  @Min(1)
  readonly produkID: number;

  @IsInt()
  @Min(1)
  readonly jumlahProduk: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  subtotal: number;
}
export class findAllDetailPenjualanDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  penjualanID: string;
}

export class DetailPenjualanDto {
  detailID: number;
  penjualanID: number;
  produkID: number;
  jumlahProduk: number;
  subtotal: number;
}
