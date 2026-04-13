import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { AppException } from 'src/common/exceptions/app.exception';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

// Configuración de cookies compartida
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict' as const,
}

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) { }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    const tokens = await this.authSvc.login(loginDto)

    res.cookie('accessToken', tokens.accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60
    })

    res.cookie('refreshToken', tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return { message: 'Login exitoso' }
  }

  @Get('me')
  @ApiOperation({ summary: 'Extrae el ID del usuario desde el token y busca la informacion' })
  @UseGuards(AuthGuard)
  public async getProfile(@Req() request: any) {
    return await this.authSvc.getUserById(request.user.id)
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async refreshToken(
    @Req() request: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const userSession = request.user
    const user = await this.authSvc.getUserById(userSession.id)

    if (!user || !user.hash) throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN, '0')
    if (userSession.hash !== user.hash) throw new AppException('Token inválido', HttpStatus.FORBIDDEN, '1')

    const tokens = await this.authSvc.refreshTokens(userSession.id, userSession.hash)

    res.cookie('accessToken', tokens.accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60
    })

    res.cookie('refreshToken', tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return { message: 'Tokens renovados' }
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(
    @Req() request: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const userSession = request.user
    await this.authSvc.updateHash(userSession.id, null)

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
  }
}