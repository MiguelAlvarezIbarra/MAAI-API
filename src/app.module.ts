import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
<<<<<<< HEAD
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [],
=======
import { AuthService } from './modules/auth/auth.service';
import { TaskModule } from './modules/task/interface/task.module';
import { UserModule } from './modules/users/interface/user.module';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule
  ],
 
>>>>>>> 334b1a7 (fix: Uso de prisma y corrección del CRUD)
})
export class AppModule {}
