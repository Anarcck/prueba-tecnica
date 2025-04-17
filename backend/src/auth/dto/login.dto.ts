import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'reto@blindariesgos.com', description: 'Correo del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Reto123', description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;
}