<<<<<<< HEAD
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
=======
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilService } from 'src/common/services/util.servise';
>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly utilSvc: UtilService,
    private readonly jwtService: JwtService
  ) { }


  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const isPasswordValid = await this.utilSvc.checkPassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    //Generar un token por 60 segundos (id, name, lastname, created_at)
    //2 metodos para: Obtener el playload, y otro para generar el token enviando el playload y la fecha de expiración
    const playload = await this.utilSvc.getPayload(user);

    const accessToken = await this.utilSvc.generateToken(playload, '60000s');

    //Generar un refresh token por 7 dias (Guardarlo en la Base de datos)
    const refreshToken = await this.utilSvc.generateToken(playload, '7d');


    //Retornar access token y el refresh token.
    await this.prisma.user.update({where:{id:user.id}, data:{refreshToken: refreshToken}});

    return {
      accessToken,
      refreshToken
    };
  }
<<<<<<< HEAD
}
>>>>>>> 20ac81c (feature: Configuración de Login)
=======

}
>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)
