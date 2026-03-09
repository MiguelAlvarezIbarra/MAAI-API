import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

 async insertUser(dto: CreateUserDto) {
  const exists = await this.prisma.user.findUnique({ where: { username: dto.username } });
  if (exists)
    throw new ConflictException(`El username '${dto.username}' ya está en uso`);

  return this.prisma.user.create({
    data: {
      name: dto.name,
      lastname: dto.lastname,
      username: dto.username,
      password: dto.password,
    },
  });
}

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.getUserById(id);
    return this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        lastname: dto.lastname,
        username: dto.username,
        password: dto.password,
      },
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}