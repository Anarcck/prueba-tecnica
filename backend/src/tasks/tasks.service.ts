import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksGateway } from './task.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private tasksGateway: TasksGateway, // 🔌 Gateway inyectado
  ) {}

  async createTask(dto: CreateTaskDto, reqUser: any): Promise<Task> {
    const task = this.taskRepo.create({
      ...dto,
      user: { id: reqUser.userId } as any,
    });

    const saved = await this.taskRepo.save(task);
    this.tasksGateway.emitTaskCreated(saved); // 🚀 Emitir evento
    return saved;
  }

  async getUserTasks(user: any): Promise<Task[]> {
    return this.taskRepo.find({
      where: {
        user: { id: user.userId },
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto, user: any): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id, user: { id: user.userId } },
    });
  
    if (!task) throw new NotFoundException('Tarea no encontrada');
  
    const hasChanges = Object.keys(dto).length > 0;
    if (!hasChanges) throw new Error('No se proporcionaron campos para actualizar');
  
    Object.assign(task, dto);
    await this.taskRepo.save(task);
  
    const updatedTask = await this.taskRepo.findOne({ where: { id } });

    if (!updatedTask) throw new NotFoundException('No se pudo cargar la tarea actualizada');
    
    this.tasksGateway.emitTaskUpdated(updatedTask);
    return updatedTask;
    
  }
  

  async deleteTask(id: number, user: any): Promise<void> {
    const result = await this.taskRepo.delete({ id, user: { id: user.userId } });

    if (result.affected === 0) {
      throw new NotFoundException('Tarea no encontrada o no autorizada');
    }

    this.tasksGateway.emitTaskDeleted(id); // 🚀 Emitir evento
  }
}
