import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './tasks-status.enum';
import { CreateTask } from './dto/create-task.dto';
import { StatusTask } from './dto/update-task.dto';
import { SearchFilter } from './dto/search-filter.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async addTask(createTask: CreateTask, user: User): Promise<Task> {
    const { title, description } = createTask;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TasksStatus.OPEN,
      user,
    });

    await this.tasksRepository.save(task);

    return task;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  getTasksBySearch(keyFilter: SearchFilter, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(keyFilter, user);
  }

  async deleteTaskByID(id: string, user: User): Promise<void> {
    const res = await this.tasksRepository.delete({ id, user });

    if (res.affected === 0) {
      throw new NotFoundException(`ID : ${id} not found`);
    }
  }

  async updateStatusTask(
    statusTask: StatusTask,
    id: string,
    user: User,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id, user });

    if (!task) {
      throw new NotFoundException(`ID: ${id} Not Found !!!`);
    }

    task.status = statusTask.status;

    await this.tasksRepository.save(task);

    return task;
  }
}
