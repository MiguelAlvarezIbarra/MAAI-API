import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update.task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTasks() {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return task;
  }

  async insertTask(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        name: dto.name,
        description: dto.description,
        priority: dto.priority,
        userId: dto.user_id,
      },
    });
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
  await this.getTaskById(id);
  return this.prisma.task.update({
    where: { id },
    data: {
      name: dto.name,
      description: dto.description,
      priority: dto.priority,
      userId: dto.user_id,
    },
  });
}

  async deleteTask(id: number): Promise<boolean> {
    try {
      await this.prisma.task.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async getTasksByUser(userId: number) {
  await this.prisma.user.findUniqueOrThrow({ where: { id: userId } }).catch(() => {
    throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
  });

  return this.prisma.task.findMany({ where: { userId } });
}
}
