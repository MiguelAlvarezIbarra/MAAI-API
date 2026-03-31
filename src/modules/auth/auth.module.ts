import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UtilService } from 'src/common/services/util.servise';
import { pgProvider } from '../../common/providers/pg.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, pgProvider[0], UtilService],
})
export class AuthModule {}