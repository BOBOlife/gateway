import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {  FastifyAdapter, NestFastifyApplication  } from '@nestjs/platform-fastify'
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter);

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI
  })

  app.useGlobalInterceptors(new TransformInterceptor())

  // 异常过滤器 注意顺序
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter())


  await app.listen(8888);
}
bootstrap();
