import { Module } from '@nestjs/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
=======
import { JwtModule } from '@nestjs/jwt';
=======
>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { pgProvider } from '../../common/providers/pg.provider';
import { PrismaService } from 'src/prisma.service';
import { UtilService } from 'src/common/services/util.servise';

@Module({
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [AuthService, PrismaService, UtilService],
>>>>>>> 20ac81c (feature: Configuración de Login)
=======
  providers: [AuthService, PrismaService, pgProvider[0], UtilService],
>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)
})
export class AuthModule {}
