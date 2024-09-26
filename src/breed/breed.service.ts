import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  findAll(): Promise<Breed[]> {
    return this.breedRepository.find();
  }
}
