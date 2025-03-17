import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalPipes(new ValidationPipe());
  // app.use(cookieParser(process.env.COOKIE_SECRET, { sameSite: 'strict' }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('AILogue')
    .setDescription('The AILogue API description')
    .setVersion('1.0')
    .addTag('AILogue')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

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
