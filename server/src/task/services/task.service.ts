import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from '../models/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  findOne(id: number): Observable<Task> {
    return from(this.taskRepository.findOne(id));
  }

  create(task: Task): Observable<Task> {
    return from(this.taskRepository.save(task));
  }

  async update(task: Task): Promise<UpdateResult> {
    return await this.taskRepository.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
