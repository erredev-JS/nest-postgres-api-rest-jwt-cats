import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':size/:pageSelected')
  @Auth(Role.ADMIN)
  findAllPaged(
    @Param('size') size: number,
    @Param('pageSelected') pageSelected: number,
  ) {
    return this.usersService.findAllPaged(size, pageSelected);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
