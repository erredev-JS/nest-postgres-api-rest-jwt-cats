import { BadRequestException, Body, Get, Injectable, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import {Repository} from 'typeorm'
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/auth/types/userActive.interface';
@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ){}
 
  @Post()
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {

    const breed = await this.breedRepository.findOneBy({id: createCatDto.breedId})
   
     if(!breed){
       throw new BadRequestException('a')
     }else{
       const cat = await this.catRepository.create({
         name: createCatDto.name,
         age: createCatDto.age,
         breed,
         userEmail: user.email
       });
       return await this.catRepository.save(cat);
     }
  }
  @Get() 
  async findAll() {
    return await this.catRepository.find()
  }

  async findOne(@Param() id: number) {
    const cat = await this.catRepository.findOneBy({id: id})
    if(!cat){ 
      return `No hay gato con id ${id}`
    }else{
      return cat
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return await this.catRepository.update({id}, updateCatDto)
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id});
  }
}
