/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
