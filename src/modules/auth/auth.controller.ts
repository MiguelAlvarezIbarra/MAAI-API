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

@Controller("/api/auth")
export class AuthController { 

    constructor( private authSvc: AuthService) {}


    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Verificar las credenciales y generar un jwt y un refresh token" })
    public login(): string {
        return this.authSvc.login();
    }

    @Get("profile")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Obtener el perfil del usuario autenticado" })
    public getProfile() {
    }

    public refreshToken() {
    }

    public logout() {
    }

}
>>>>>>> 4347d41 (fix: Correción del CRUD de usuarios y uso de bcrypt)
