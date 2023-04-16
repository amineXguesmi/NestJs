/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import CreateTodoDTO  from 'src/DTO/Create-todo-DTO';
import UpdateTodoDTO from 'src/DTO/Update-todo-DTO';
import { HttpException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TodoStatusEnum } from 'src/spec-class/todo';
import Todo from 'src/spec-class/todo';
import TodoEntity from 'src/entities/Todo';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import FindTodoFilterDTO from 'src/DTO/Find-todo-DTO';
@Injectable()
export class TodoService {

    private todos = [
        new Todo("ec71a182-e0e2-416a-b22e-e2e608b038ae", "todo1", "descrip1", new Date(), TodoStatusEnum["waiting"]),
        new Todo("7a1de13c-4e8f-4309-adb6-f2f5c3432ee6", "todo2", "descrip2", new Date(), TodoStatusEnum["actif"]),
        new Todo("79f4939f-2e33-4e42-adc3-7a2b484b0b37", "todo3", "descrip3", new Date(), TodoStatusEnum["done"]),
    ]
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) { }

    findall(){
        return this.todos;
    }
    findById(id: string): Todo{
        let todo;
        this.todos.forEach(Element=>{
            if(Element.id==id){
                todo=Element}
        })
        return todo;
    }
    create(createTodoDTO:CreateTodoDTO){
        const { name, description, status } = createTodoDTO;
        const newtodo = new Todo(randomUUID().toString(), name, description, new Date(), status);
        this.todos.push(newtodo);
        return this.todos;
    }
    
    delete(id:string){
        const newTodos = this.todos.filter(Element => Element.id != id);
        return newTodos;
    }
    Update(updateTodoDTO: UpdateTodoDTO){
        const { id,name, description, status } = updateTodoDTO;
        const foundTodo = this.findById(id);
        foundTodo.name = name ?? foundTodo.name;
        foundTodo.description = description ?? foundTodo.description;
        foundTodo.status = status ?? foundTodo.status;
        return foundTodo;
    }
    async addTodoToDb(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        const todoToCreate: TodoEntity = new TodoEntity(
            createTodoDTO.name,
            createTodoDTO.description,
            createTodoDTO.status,
        );
        await this.todoRepository.save(todoToCreate);
        return todoToCreate;
    }
    async updateTodoByIdToDb(id: string, updateTodoDTO: UpdateTodoDTO) {
        let updates = {};
        if (updateTodoDTO.name !== null) {
            updates = { name: updateTodoDTO.name, ...updates };
        }
        if (updateTodoDTO.description !== null) {
            updates = { description: updateTodoDTO.description, ...updates };
        }
        if (updateTodoDTO.status !== null) {
            updates = { status: updateTodoDTO.status, ...updates };
        }
        const todoToUpdate = await this.todoRepository.update(id, updates);
        return updates;
    }
    async  deleteTodoBd(id: string) {
        const todoToDelete = await this.todoRepository.delete(id);
        return todoToDelete;
    }
    //soft delete 
    async SoftdeleteTodoBd(id: string) {
        const todo = await this.todoRepository.find();
        const todoToDelete = todo.find(Element => Element.id==id);
        if(todoToDelete){
            todoToDelete.deletedAt=new Date();
            await this.todoRepository.save(todoToDelete);
        }
        
    }
    async RestoreTodoBd(id:string){
        const todo = await this.todoRepository.find( {withDeleted: true });
        const todoToRestore = todo.find(Element => Element.id == id);
        if (todoToRestore) {
            todoToRestore.deletedAt = null;
            await this.todoRepository.save(todoToRestore);
        }
    }
    async NTodosPerStatus() {
        return {
            actif: await this.todoRepository.count({
                where: { status: TodoStatusEnum.actif },
            }),
            waiting: await this.todoRepository.count({
                where: { status: TodoStatusEnum.waiting },
            }),
            done: await this.todoRepository.count({
                where: { status: TodoStatusEnum.done },
            }),
        };
    }

    async todosEndpoint(filterDTO: FindTodoFilterDTO) {
        const todo = await this.todoRepository.find({ withDeleted: true });
        console.log(todo);
        let where: any = {};
        if (filterDTO.description !== null) {
            where = [
                { description: Like(`%${filterDTO.description}%`),status :filterDTO.status },
                { name: Like(`%${filterDTO.description}%`),status:filterDTO.status },
            ];
        }
        let options: FindManyOptions = {
            where,
            withDeleted: true,
        };
        if (filterDTO.page && filterDTO.take) {
            options.take = filterDTO.take;
            options.skip = filterDTO.take * (filterDTO.page - 1);
        }
        console.log(options);
        return await this.todoRepository.find(options);
    }
    async todoEndpointById(id: string) {
        const todos: Array<TodoEntity> = await this.todoRepository.find({
            where: { id },
            withDeleted: true,
        });
        if (todos.length) {
            return todos[0];
        } else {
            throw new HttpException('no todo with that id', 404);
        }
    }

    
}
