import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    console.log(
      `[Server] Server started and running on http://localhost:${PORT}`,
    );
  })
  .catch((error) => {
    console.error(`[Server] Error starting server at port: ${error}`);
  });
