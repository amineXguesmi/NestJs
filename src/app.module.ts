/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './Premier/premier/premier.module';
import { TodoModule } from './Todo/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoEntity from './entities/Todo';

@Module({
  imports: [
    PremierModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username:"root",
      password: "",
      database: "tp_nest",
      entities: [TodoEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
