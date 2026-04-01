import { IsOptional, IsString, MaxLength, MinLength, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(150)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  lastname?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  username?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsInt()
  @IsOptional()
  rol_id?: number | null;
}