/* eslint-disable prettier/prettier */
import { Controller,Get, Post,Delete,Put, Param, Body } from '@nestjs/common';
import { randomUUID } from 'crypto';
import CreateTodoDTO from 'src/DTO/Create-todo-DTO';
import Todo, { TodoStatusEnum } from 'src/spec-class/todo';
import { TodoService } from '../todo.service'
import UpdateTodoDTO from 'src/DTO/Update-todo-DTO';

@Controller('todo')
export class TodoController {
    constructor(private TodoService: TodoService) { }
    
    @Get("all")
    GetTodos(){
        return this.TodoService.findall();
    }
    @Get('find/:id')
    async getTodoById(@Param('id') id: string) {
        return this.TodoService.findById(id);
    }
    @Post('create')
    async CreateTodo(@Body() createTodoDTO: CreateTodoDTO  ){
        return this.TodoService.create(createTodoDTO);
    }
    
    @Delete('delete/:id')
    async deleteTodoById(@Param('id') id: string) {
        return this.TodoService.delete(id);
    }
    @Post("update")
    async updateTodo(@Body() updateTodoDTO: UpdateTodoDTO){
        return this.TodoService.Update(updateTodoDTO);
    }


}


