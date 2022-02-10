import { ApiProperty } from '@nestjs/swagger';

export class Repository {
  @ApiProperty()
  name: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  html_url: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url: string;
}
