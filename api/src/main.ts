import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { main as seedDatabase } from 'prisma/seed';
import { AppErrorFilter } from './errors/AppErrorFilter';
// import { AppErrorFilter } from './errors/app-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não decoradas
      forbidNonWhitelisted: true, // Lança erro se houver propriedades extras
      transform: true, // Transforma os dados recebidos para as classes DTO
    }),
  );

  app.useGlobalFilters(new AppErrorFilter());
  const prisma = new PrismaClient();

  try {
    await seedDatabase().catch((error) => {
      console.error('Error seeding the database:', error);
    });
  } finally {
    await prisma.$disconnect();
  }

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
