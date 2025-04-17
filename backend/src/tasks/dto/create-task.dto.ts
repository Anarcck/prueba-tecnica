import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Comprar pan',
    description: 'Título breve de la tarea',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'Ir a la panadería antes de las 6',
    description: 'Descripción más detallada de la tarea',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
