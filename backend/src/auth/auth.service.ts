import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new UnauthorizedException('El correo ya está en uso');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ email, password: hashedPassword, name });

    return {
      message: 'Usuario registrado correctamente',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }
}
