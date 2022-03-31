import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { getUser } from 'src/auth/get-user.decotory';
import { CreateTask } from './dto/create-task.dto';
import { SearchFilter } from './dto/search-filter.dto';
import { StatusTask } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getTaskBySearch(
    @Query() keyFilter: SearchFilter,
    @getUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasksBySearch(keyFilter, user);
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string, @getUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTaskByID(
    @Param('id') id: string,
    @getUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskByID(id, user);
  }

  @Post()
  addTask(
    @Body() createTask: CreateTask,
    @getUser() user: User,
  ): Promise<Task> {
    return this.tasksService.addTask(createTask, user);
  }

  @Patch('/:id/status')
  updateStatusTask(
    @Body() statusTask: StatusTask,
    @Param('id') id: string,
    @getUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateStatusTask(statusTask, id, user);
  }
}
