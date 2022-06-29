import { IsString, IsNumber, IsArray } from 'class-validator';
import { Image } from '@/interfaces/image.interface';

export class CreateBookDto {
  @IsString()
  public code: string;

  @IsString()
  public title: string;

  @IsString()
  public author: string;

  @IsNumber()
  public publish_year: number;

  @IsString()
  public publisher: string;

  @IsArray()
  public images: Image[];
}
