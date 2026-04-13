import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllException } from './common/filters/http-exception.filter';
import { PrismaService } from './prisma.service';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const prisma = app.get(PrismaService);
  app.useGlobalFilters(new AllException(prisma));

  const config = new DocumentBuilder()
    .setTitle('API de Tareas')
    .setDescription('API para la gestión de tareas')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Servidor local')
    .addServer('http://dominio.com', 'Servidor de producción')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();