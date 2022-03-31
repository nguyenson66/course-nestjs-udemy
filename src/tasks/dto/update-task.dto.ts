import { IsEnum } from 'class-validator';
import { TasksStatus } from '../tasks-status.enum';

export class StatusTask {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
