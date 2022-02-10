import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Github Repositories')
    .setDescription('available Github repositories')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Noxtton Task',
  });

  await app.listen(process.env.SERVER_PORT, () =>
    logger.log(`Server started on port ${process.env.SERVER_PORT}`),
  );
}
bootstrap();
