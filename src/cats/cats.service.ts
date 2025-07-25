import {
  BadRequestException,
  Body,
  Get,
  Injectable,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/auth/types/userActive.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { ActiveUser } from 'src/auth/decorators/activeUser.decorator';
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

 
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.breedRepository.findOneBy({
      id: createCatDto.breedId,
    });

    if (!breed) {
      throw new BadRequestException('Breed inexistente');
    } else {
      const cat = await this.catRepository.create({
        name: createCatDto.name,
        age: createCatDto.age,
        breed,
        userEmail: user.email,
      });
      return await this.catRepository.save(cat);
    }
  }

  
  async findAll () {
    return await this.catRepository.find()
  }

 async findAllPaged(pageSelected: number, size: number) {
  const [cats, count] = await this.catRepository.findAndCount({
    skip: pageSelected * size,
    take: size,
  });

  const totalPages = Math.ceil(count / size);

  return {
    totalPages,
    result: cats,
  };
}

 
  
  async getOwnCats(user : UserActiveInterface) {
    return await this.catRepository.find({
      where: { userEmail: user.email },
      // relations: ['breed']
    });
  }

  async getOwnCatsPaged(user: UserActiveInterface, pageSelected: number, size: number){
     const [cats, count] = await this.catRepository.findAndCount({
    where: {userEmail: user.email},
    skip: pageSelected * size,
    take: size,
  });

  const totalPages = Math.ceil(count / size);

  return {
    totalPages,
    result: cats,
  };
  }

  async findOne(@Param() id: number) {
    const cat = await this.catRepository.findOneBy({ id: id });
    if (!cat) {
      return `No hay gato con id ${id}`;
    } else {
      return cat;
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
   const {breedId, ...body} = updateCatDto
   return await this.catRepository.update(
    {id}, {
      ...body,
      breed: {id: breedId}
    }
   )
  }

  async remove(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({id})
    if((cat?.userEmail === user.email) || user.role === Role.ADMIN){
      return await this.catRepository.softDelete({ id });
    }else{
      throw new UnauthorizedException({message: 'Este gato no es de tu autoria.'})
    }
  }
}
