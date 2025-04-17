import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Estudiar NestJS',
    description: 'Nuevo título de la tarea',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Avanzar en los módulos de práctica',
    description: 'Nueva descripción de la tarea',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Marcar como completada o no',
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
