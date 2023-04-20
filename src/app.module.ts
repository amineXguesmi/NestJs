/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './Premier/premier/premier.module';
import { TodoModule } from './Todo/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TodoEntity from './entities/Todo';
import { AuthMiddlewareMiddleware } from './auth.middleware/auth.middleware.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthMiddlewareMiddleware).forRoutes(
      'todo',
      {
        path: 'UpdateToBd*',
        method: RequestMethod.POST,
      },
      {
        path: 'UpdateToBd*',
        method: RequestMethod.POST,
      },
      {
        path: 'deleteBd*',
        method: RequestMethod.DELETE,
      },
    );
  }
}