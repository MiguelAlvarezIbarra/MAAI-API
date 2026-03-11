import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../../prisma.service';
import { UtilService } from 'src/common/services/util.servise';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UtilService],
})
export class UserModule {}