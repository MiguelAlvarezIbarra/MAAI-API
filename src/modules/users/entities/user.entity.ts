import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Miguel' })
  name: string;

  @ApiProperty({ example: 'Alvarez', required: false })
  lastname?: string | null;

  @ApiProperty({ example: 'miguel123' })
  username: string;

  @ApiProperty({ example: '2026-03-05T18:30:00.000Z' })
  createdAt: Date;
}