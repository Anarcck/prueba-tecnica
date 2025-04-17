import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { UsersModule } from '../users/users.module';
import { TasksGateway } from './task.gateway'; // 👈 IMPORTA el gateway

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TasksService, TasksGateway], // 👈 AGREGA el gateway como provider
  controllers: [TasksController],
})
export class TasksModule {}
