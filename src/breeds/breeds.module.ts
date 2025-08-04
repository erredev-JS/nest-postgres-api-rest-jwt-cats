import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Cat } from 'src/cats/entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breed, Cat])],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule]
})
export class BreedsModule {}
