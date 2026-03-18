import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AuthModule } from './modules/auth/auth.module';
<<<<<<< HEAD
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [],
=======
import { AuthService } from './modules/auth/auth.service';
import { TaskModule } from './modules/task/interface/task.module';
=======
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config'; 
>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)
import { UserModule } from './modules/users/interface/user.module';
import { TaskModule } from './modules/task/interface/task.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, 
    UserModule, 
    TaskModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
<<<<<<< HEAD
 
>>>>>>> 334b1a7 (fix: Uso de prisma y corrección del CRUD)
=======
>>>>>>> 2381343 (fix: Uso de guards y proteccion de rutas)
})
export class AppModule {}