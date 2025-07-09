import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  @Auth(Role.USER)
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Role.USER)
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.catsService.remove(+id);
  }
}
