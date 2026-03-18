<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('login')
  login() {
    return 'Autenticación Aprobada';
  }
}
=======
import { Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
=======
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
>>>>>>> 20ac81c (feature: Configuración de Login)
=======
import {
  Body,
  Controller,
  HttpCode,
  Post
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) { }

<<<<<<< HEAD
}
>>>>>>> 4347d41 (fix: Correción del CRUD de usuarios y uso de bcrypt)
=======
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authSvc.login(loginDto);
  }
}
>>>>>>> 20ac81c (feature: Configuración de Login)
