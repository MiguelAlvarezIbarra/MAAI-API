<<<<<<< HEAD
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): string {
    return 'Autenticación Correcta';
  }
}
=======
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilService } from '../../common/services/util.servise';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private utilService: UtilService,
  ) {}

  async login(dto: LoginDto) {
    // Verificar si existe el username
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user)
      throw new UnauthorizedException('Credenciales incorrectas');

    // Verificar contraseña
    const passwordValid = await this.utilService.checkPassword(dto.password, user.password);

    if (!passwordValid)
      throw new UnauthorizedException('Credenciales incorrectas');

    // Generar payload
    const payload = this.utilService.getPayload(user);

    // Generar tokens
    const accessToken = this.utilService.generateAccessToken(payload);
    const refreshToken = this.utilService.generateRefreshToken(payload);

    // Guardar refresh token en la DB
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }
}
>>>>>>> 20ac81c (feature: Configuración de Login)
