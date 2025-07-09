import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { BreedsModule } from 'src/breeds/breeds.module';
import { Breed } from 'src/breeds/entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Breed])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
