import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum SortDir {
  DESC = 'desc',
  ASC = 'asc',
}

export class getAllRepositoriesSto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  searchKey: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ignoreKey?: string;

  @ApiPropertyOptional({ enum: SortDir, isArray: true })
  @IsOptional()
  @IsEnum(SortDir)
  sortDir?: SortDir;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsString()
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsString()
  limit?: number;
}
