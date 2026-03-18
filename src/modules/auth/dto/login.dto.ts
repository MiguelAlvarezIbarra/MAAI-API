import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
   @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}