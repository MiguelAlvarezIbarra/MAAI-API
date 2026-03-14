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

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService) {}

<<<<<<< HEAD
}
>>>>>>> 4347d41 (fix: Correción del CRUD de usuarios y uso de bcrypt)
=======
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Iniciar sesión' })
  public async login(@Body() dto: LoginDto) {
    return await this.authSvc.login(dto);
  }
}
>>>>>>> 20ac81c (feature: Configuración de Login)
