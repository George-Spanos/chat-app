import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 3000;
console.log('Port: ', PORT)
console.log('Node Version', process.version);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log('Listening to port ' + PORT)
}
bootstrap();
