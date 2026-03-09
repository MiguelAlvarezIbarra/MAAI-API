import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Nombre es requerido' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ description: 'Nombre de la tarea', example: 'Tarea 1' })
  name: string;

  @IsString({ message: 'Descripción es requerida' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'Descripción de la tarea', example: 'Descripción de la tarea 1' })
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ description: 'Prioridad de la tarea', example: true, required: false })
  priority: boolean;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  user_id: number;
}