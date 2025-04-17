import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'reto@blindariesgos.com', description: 'Correo del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Reto123', description: 'Contraseña segura del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Usuario de prueba', description: 'Nombre completo' })
  @IsString()
  @IsNotEmpty()
  name: string;
}