import { Injectable, NotFoundException } from '@nestjs/common';
import { Todos } from './todos.model';

@Injectable() 
export class TodosService{
    private todos: Todos[] = [];

    insertTodo(title: string, description: string){
        const todoId = new Date().toString();
        const newTodo = new Todos(todoId, title, description);
        this.todos.push(newTodo);
        return todoId;
    }

    getAllTodos(){
        return [...this.todos];
    }

    getTodo(todoId: string){
        const todo = this.todos.find((todo) => todo.id === todoId);
        if(!todo){
           throw new NotFoundException("Data not found!");
        } 
        return {...todo};
    }

    updateTodo(todoId: string, title: string, description: string){
        const todo = this.todos.find((todo) => todo.id === todoId);
        if(!todo){
            throw new NotFoundException("Data not found!");
        }
        todo.title = title;
        todo.description = description;
        return {...todo};
    }

    deleteTodo(todoId: string){
        const todo = this.todos.find((todo) => todo.id === todoId);
        if(!todo){
            throw new NotFoundException("Data not found!");
        }
        this.todos.splice(this.todos.indexOf(todo), 1);
    }
}