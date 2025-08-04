import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import {Repository} from 'typeorm'
import { Cat } from 'src/cats/entities/cat.entity';
@Injectable()
export class BreedsService {

  constructor (
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    const breed = this.breedRepository.create(createBreedDto)
    return await this.breedRepository.save(breed)
  }

  async findAll() {
    return await this.breedRepository.find()
  }
    
   async findAllPaged(pageSelected: number, size: number) {
    const [breeds, count] = await this.breedRepository.findAndCount({
      skip: pageSelected * size,
      take: size,
      order: {id: "ASC"}
    });
  
    const totalPages = Math.ceil(count / size);
  
    return {
      totalPages,
      result: breeds,
    };
  }
  async findOne(id: number) {
   const breed = await this.breedRepository.findOneBy({id})
   if(!breed){
    return `No hay breed con id ${id}`
   }
   return breed
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return this.breedRepository.update(id, updateBreedDto)
  }

  async remove(id: number) {
    const breed = await this.breedRepository.findOneBy({id})
    if(!breed){
      throw new NotFoundException('Raza inexistente')
    }
    const catsCount = await this.catRepository.count({
      where: {breed: breed}
    })

    if(catsCount > 0){
      throw new BadRequestException('No puedes eliminar una raza asignada a otros gatos.')
    }

    return this.breedRepository.softDelete(id);
  }
}
