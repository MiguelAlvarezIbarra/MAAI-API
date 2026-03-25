import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UtilService } from 'src/common/services/util.servise';
import { User } from '../entities/user.entity';
import { Task } from 'src/generated/prisma/client';

@Injectable()
export class UserService {

  constructor(@Inject('PG_CONNECTION') private db: any, private prisma: PrismaService, private readonly utilSvc: UtilService) { }
  login(): string {
    return 'Autenticación correcta';
  }

  private users: any[] = [];

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany(
      {
        orderBy: [{ name: "asc" }],
        select: {
          id: true,
          name: true,
          lastname: true,
          username: true,
          password: true,
          created_dt: true
        }
      }
    );
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: false,
        created_dt: true
      }

    });

    if (user == undefined) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrada`);
    }

    return user;
  }

  async insertUser(user: CreateUserDto) {
  const { username, password, lastname, ...restOfUser } = user;  // ✅ extrae lastname aparte

  const sameUser = await this.prisma.user.findUnique({
    where: { username }
  });

  if (sameUser) {
    throw new ConflictException(`El usuario con el username '${username}' ya existe`);
  }

  const encryptedPassword = await this.utilSvc.hash(password);

  const newUser = await this.prisma.user.create({
    data: {
      ...restOfUser,
      username,
      password: encryptedPassword,
      lastname: lastname ?? ''
    },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      created_dt: true
    }
  });

  return newUser;
}

  async updateUser(id: number, userUpdate: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id }, data: userUpdate, select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: false,
        created_dt: true
      }
    });

    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser ? true : false;
  }

  async getTaskByUser(id: number): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { user_id: id }
    });

    return tasks;
  }
}