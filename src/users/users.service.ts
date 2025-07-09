import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {Repository} from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user)

  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({id: id})
  }

  async findOneByEmail(email: string){
    return await this.userRepository.findOneBy({email: email}) 
  }

  async findByEmailWithPassword(email: string){
    return await this.userRepository.findOne({where: {email}, select: ['id', 'name', 'email', 'password', 'role']})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id: id})
    if(!user){
      return `Usuario con id: ${id} no encontrado`
    }
    return this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}
