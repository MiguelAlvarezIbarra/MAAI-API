import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../../prisma.service';
import { UtilService } from 'src/common/services/util.servise';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { pgProvider } from 'src/common/providers/pg.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, pgProvider[0], UtilService, AuthGuard],
})
export class UserModule {}