import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService){}

  @Post('post')
  addTodos( @Body('title') todoTitle: string, @Body('description') todoDescription: string): any {
    const generatedId = this.todosService.insertTodo(todoTitle, todoDescription);
    return {id: generatedId};
  }

  @Get('get')
  getAllTodos(){
    return this.todosService.getAllTodos();
  }

  @Get('search/:id')
  getTodo(@Param('id') todoId: string) {
    return this.todosService.getTodo(todoId);
  }

  @Patch('update/:id')
  updateTodo(@Param('id') todoId: string, @Body('title') todoTitle : string, @Body('description') description : string) {
    this.todosService.updateTodo(todoId, todoTitle, description);
    return null;
  }

  @Delete('delete/:id')
  deleteTodo(@Param('id') todoId: string){
    this.todosService.deleteTodo(todoId);
    return null;
  }

}                                                                                                                              