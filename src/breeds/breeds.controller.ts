import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: number, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(+id, updateBreedDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: number) {
    return this.breedsService.remove(+id);
  }
}
