import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  controllers: [AppController],
  imports: [ChatModule],
  providers: [],
})
export class AppModule {}
