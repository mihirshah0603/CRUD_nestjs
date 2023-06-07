import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService){}

  @Post('post')
  @ApiOperation({summary: 'create a todo'})
  @ApiBody({
    schema:{
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Task 1',
          description: 'This is the title of the todo'
        },
        description: {
          type: 'string',
          example: 'This is my first nestjs application',
          description: 'This is the description of the todo'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'added..'
  })
  @ApiResponse({

    status: 403,
    description: 'Forbidden'
  })
  addTodos( @Body('title') todoTitle: string, @Body('description') todoDescription: string): any {
    const generatedId = this.todosService.insertTodo(todoTitle, todoDescription);
    return {id: generatedId};
  }

  @Get('get')
  @ApiOperation({summary: 'Get all Todos'})
  @ApiResponse({
    status: 200,
    description: 'All Todos have been fetched successfully'
  })
  @ApiResponse({

    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  getAllTodos(){
    return this.todosService.getAllTodos();
  }

  @Get('search/:id')
  @ApiOperation({summary: 'Search the todo'})
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter the id',
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'searched..'
  })
  @ApiResponse({

    status: 403,
    description: 'Forbidden'
  })
  getTodo(@Param('id') todoId: string) {
    return this.todosService.getTodo(todoId);
  }

  @Patch('update/:id')
  @ApiOperation({summary: 'Update the todo'})
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter the id',
    required: true
  })
  @ApiBody({
    schema:{
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Task 1',
          description: 'This is the title of the todo'
        },
        description: {
          type: 'string',
          example: 'This is my first nestjs application',
          description: 'This is the description of the todo'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'updated..'
  })
  @ApiResponse({

    status: 403,
    description: 'Forbidden'
  })
  updateTodo(@Param('id') todoId: string, @Body('title') todoTitle : string, @Body('description') description : string) {
    this.todosService.updateTodo(todoId, todoTitle, description);
    return null;
  }

  @Delete('delete/:id')
  @ApiOperation({summary: 'delete the todo'})
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter the id',
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'deleted..'
  })
  @ApiResponse({

    status: 403,
    description: 'Forbidden'
  })
  deleteTodo(@Param('id') todoId: string){
    this.todosService.deleteTodo(todoId);
    return null;
  }

}                                                                                                                              