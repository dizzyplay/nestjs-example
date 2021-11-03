import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator가 없는 프로퍼티를 제외시킴
      forbidNonWhitelisted: true, // 존재하지않는 프로퍼티가 있을때 에러를 냄
      transform: true, // query parma의 타입에 맞게 변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
