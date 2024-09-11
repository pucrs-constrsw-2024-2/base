import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Microsserviço de autenticação')
    .setDescription(
      'Esse microsserviço é responsável por autenticar usuários, lidar com tokens de acesso e gerenciar a base de clientes.',
    )
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      theme: 'purple',
      spec: {
        content: document,
      },
    }),
  );
  await app.listen(8080);
}
bootstrap();
