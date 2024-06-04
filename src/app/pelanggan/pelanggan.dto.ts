import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import BaseResponse from 'src/utils/response/base.response';

export class CreatePelangganDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255) namaPelanggan: string;

  @IsString()
  @IsNotEmpty() alamat: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 15) nomorTelepon: string;

  @IsOptional() create_at: Date;

  @IsOptional() update_at: Date;
}

export class UpdatePelangganDto {
  @IsString()
  @IsOptional()
  @Length(1, 255) namaPelanggan?: string;

  @IsString()
  @IsOptional() alamat?: string;

  @IsString()
  @IsOptional()
  @Length(1, 15)
   nomorTelepon?: string;
}

export class findAllPelangganDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  pelangganID: string;
}
