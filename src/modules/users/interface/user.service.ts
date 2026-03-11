import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UtilService } from 'src/common/services/util.servise';

const omitPassword = { password: true } as const;

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private utilService: UtilService,
  ) {}

  async getUsers() {
    return this.prisma.user.findMany({ omit: omitPassword });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: omitPassword
    });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

  async insertUser(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { username: dto.username } });
    if (exists)
      throw new ConflictException(`El username '${dto.username}' ya está en uso`);

    const hashedPassword = await this.utilService.hashPassword(dto.password);

    return this.prisma.user.create({
      omit: omitPassword,
      data: {
        name: dto.name,
        lastname: dto.lastname,
        username: dto.username,
        password: hashedPassword,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.getUserById(id);

    const data: any = {
      name: dto.name,
      lastname: dto.lastname,
      username: dto.username,
    };

    if (dto.password) {
      data.password = await this.utilService.hashPassword(dto.password);
    }

    return this.prisma.user.update({
      omit: omitPassword,
      where: { id },
      data,
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