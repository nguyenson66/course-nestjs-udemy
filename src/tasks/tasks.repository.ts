import { User } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SearchFilter } from './dto/search-filter.dto';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(keyFilter: SearchFilter, user: User): Promise<Task[]> {
    const { status, search } = keyFilter;

    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE LOWER(:key) OR task.description LIKE LOWER(:key))',
        {
          key: `%${search}%`,
        },
      );
    }

    const tasks = query.getMany();
    return tasks;
  }
}
