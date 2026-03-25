import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from '../../../prisma.service';
import { pgProvider } from 'src/common/providers/pg.provider';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UtilService } from 'src/common/services/util.servise';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, pgProvider[0], AuthGuard, UtilService],
})
export class TaskModule { }