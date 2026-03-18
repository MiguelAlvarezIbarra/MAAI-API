import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../../prisma.service';
import { UtilService } from 'src/common/services/util.servise';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    PrismaService, 
    UtilService, 
    AuthGuard    
  ],
})

export class UserModule {}