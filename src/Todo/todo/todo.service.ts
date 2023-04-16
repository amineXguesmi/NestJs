/* eslint-disable prettier/prettier */
import CreateTodoDTO  from 'src/DTO/Create-todo-DTO';
import UpdateTodoDTO from 'src/DTO/Update-todo-DTO';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TodoStatusEnum } from 'src/spec-class/todo';
import Todo from 'src/spec-class/todo';
@Injectable()
export class TodoService {

    private todos = [
        new Todo("ec71a182-e0e2-416a-b22e-e2e608b038ae", "todo1", "descrip1", new Date(), TodoStatusEnum["waiting"]),
        new Todo("7a1de13c-4e8f-4309-adb6-f2f5c3432ee6", "todo2", "descrip2", new Date(), TodoStatusEnum["actif"]),
        new Todo("79f4939f-2e33-4e42-adc3-7a2b484b0b37", "todo3", "descrip3", new Date(), TodoStatusEnum["done"]),
    ]

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



    
}
