import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('api/user')
@ApiTags('User', 'Usuarios')
export class UserController {
  constructor(private readonly userSvc: UserService) {}

  @Get()
  public async getUsers(): Promise<User[]> {
    return await this.userSvc.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userSvc.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  public async insertUser(@Body() user: CreateUserDto): Promise<User> {
    const result = await this.userSvc.insertUser(user);
    if (!result)
      throw new HttpException('Usuario no registrado', HttpStatus.INTERNAL_SERVER_ERROR);
    return result;
  }

  @Put(':id')
  public async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<User> {
    return await this.userSvc.updateUser(id, user);
  }

  @Delete(':id')
  public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const result = await this.userSvc.deleteUser(id);
    if (!result)
      throw new HttpException('No se pudo eliminar el usuario', HttpStatus.NOT_FOUND);
    return result;
  }
}