/* eslint-disable prettier/prettier */
import { Controller,Get, Post,Delete,Put, Param, Body, Version, Query } from '@nestjs/common';
import { randomUUID } from 'crypto';
import CreateTodoDTO from 'src/DTO/Create-todo-DTO';
import Todo, { TodoStatusEnum } from 'src/spec-class/todo';
import { TodoService } from '../todo.service'
import UpdateTodoDTO from 'src/DTO/Update-todo-DTO';
import TodoEntity from 'src/entities/Todo';
import FindTodoFilterDTO from 'src/DTO/Find-todo-DTO';

@Controller('todo')
export class TodoController {
    constructor(private TodoService: TodoService) { }
    //CRUD for Array todos
    @Get("all")
    GetTodos(){
        return this.TodoService.findall();
    }
    @Get('find/:id')
    async getTodoById(@Param('id') id: string) {
        return this.TodoService.findById(id);
    }
    @Post('create')
    @Version('1')
    async CreateTodo(@Body() createTodoDTO: CreateTodoDTO  ){
        return this.TodoService.create(createTodoDTO);
    }
    
    @Delete('delete/:id')
    async deleteTodoById(@Param('id') id: string) {
        return this.TodoService.delete(id);
    }
    @Post("update")
    @Version('1')
    async updateTodo(@Body() updateTodoDTO: UpdateTodoDTO){
        return this.TodoService.Update(updateTodoDTO);
    }
    //CRUD FOR BD

    @Post("addToBd")
    @Version('2')
    async AddTodoToDb(@Body() body: CreateTodoDTO): Promise<TodoEntity> {
        return await this.TodoService.addTodoToDb(body);
    }
    @Post('UpdateToBd/:id')
    @Version('2')
    async UpdateTodoByIdToDb(
        @Param('id') id: string,
        @Body() body: UpdateTodoDTO,
    ) {
        return await this.TodoService.updateTodoByIdToDb(id, body);
    }
    @Delete('deleteBd/:id')
    async deleteTodoByIdToBd(@Param('id') id: string) {
        return this.TodoService.SoftdeleteTodoBd(id);
    }
    @Delete('RestoreBd/:id')
    async RestoreTodoByIdToBd(@Param('id') id: string) {
        return this.TodoService.RestoreTodoBd(id);
    }
    @Get("Count")
    async CountTodo(){
        return  this.TodoService.NTodosPerStatus();
    }
    @Get("endpoint")
    async todosEndpoint(@Query() filterDTO: FindTodoFilterDTO) {
        console.log(filterDTO);
        return await this.TodoService.todosEndpoint(filterDTO);
    }
    @Get('endpoint/:id')
    async todoEndpointById(@Param('id') id: string) {
        return await this.TodoService.todoEndpointById(id);
    }

}


