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
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppException } from 'src/common/exceptions/app.exception';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

<<<<<<< HEAD
>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)

=======
>>>>>>> 177f286 (fix: Uso de custom errors, corrección de sesión en CRUD tareas)
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
<<<<<<< HEAD
}
>>>>>>> 20ac81c (feature: Configuración de Login)
=======
  @Get("me")
  @ApiOperation({ summary: "Extrae el id del usuario desde el token y busca la imformacion" })
  @UseGuards(AuthGuard)

  @ApiOperation({ summary: "Extrae el ID del usuario desde el token y busca la informacion" })
  public getProfile() { }


<<<<<<< HEAD
  public logout() { }
}
>>>>>>> 177f286 (fix: Uso de custom errors, corrección de sesión en CRUD tareas)
=======
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async refreshToken(@Req() request: any) {
    //TODO Obtener el usuario en sesion
    const userSession = request.user;
    const user = await this.authSvc.getUserById(userSession.id);

    if (!user || !user.hash) throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN, '0');
    //Todo Comprar el token recibido con el guardado
    if (userSession.hash != user.hash) throw new AppException('Token invalido', HttpStatus.FORBIDDEN, '1');

    //FIXME: Si el token es válido genera nuevos tokens
    return {
      access_token: '',
      refreshToken: ''
    }
  }
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(@Req() request: any) {
    const userSession = request.user;
    const user = await this.authSvc.updateHash(userSession.id, null);

    //Todo Si el token es valido se genera un nuevo token
    return user;
  }
}
>>>>>>> 256f715 (bug: Correcion de auth y creacion de rutas (fresh, logout))
