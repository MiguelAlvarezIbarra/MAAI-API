import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  @ApiProperty({ example: 'Miguel' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  @ApiProperty({ example: 'Alvarez', required: false })
  lastname?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'miguel123' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '123456' })
  password: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 1, required: false })
  rol_id?: number | null;
}