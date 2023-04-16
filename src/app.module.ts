/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './Premier/premier/premier.module';
import { TodoModule } from './Todo/todo/todo.module';

@Module({
  imports: [
    PremierModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
