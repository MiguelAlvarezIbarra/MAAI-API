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

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authSvc.login(loginDto);
  }

  @Get("me")
  @ApiOperation({ summary: "Extrae el ID del usuario desde el token y busca la informacion" })
  @UseGuards(AuthGuard)
  public getProfile() { }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async refreshToken(@Req() request: any) {
    const userSession = request.user
    const user = await this.authSvc.getUserById(userSession.id)

    if (!user || !user.hash) throw new AppException('Acceso denegado', HttpStatus.FORBIDDEN, '0')
    if (userSession.hash !== user.hash) throw new AppException('Token inválido', HttpStatus.FORBIDDEN, '1')

    return await this.authSvc.refreshTokens(userSession.id, userSession.hash)
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(@Req() request: any) {
    const userSession = request.user;
    const user = await this.authSvc.updateHash(userSession.id, null);
    return user;
  }
}