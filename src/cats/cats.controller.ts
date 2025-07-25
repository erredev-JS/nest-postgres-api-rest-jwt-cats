import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
import { UserActiveInterface } from 'src/auth/types/userActive.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Auth(Role.USER, Role.ADMIN)
  create(
    @Body() createCatDto: CreateCatDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
  @Get(':size/:pageSelected')
  findAllPaged(
    @Param('size', ParseIntPipe) size: number,
    @Param('pageSelected') pageSelected: number,
  ) {
    return this.catsService.findAllPaged(size, pageSelected);
  }
  @Get('ownCats')
   @Auth(Role.USER, Role.ADMIN)
  getOwnCats(@ActiveUser() user: UserActiveInterface) {
    return this.catsService.getOwnCats(user);
  }
  @Get('ownCats/:size/:pageSelected')
   @Auth(Role.USER, Role.ADMIN)
  getOwnCatsPaged(
    @ActiveUser() user: UserActiveInterface,
    @Param('size', ParseIntPipe) size: number,
    @Param('pageSelected') pageSelected: number,
  ) {
    return this.catsService.getOwnCatsPaged(user, pageSelected, size);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.USER, Role.ADMIN)
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
   @Auth(Role.USER, Role.ADMIN)
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.remove(id, user);
  }
}
