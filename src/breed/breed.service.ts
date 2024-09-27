import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './breed.entity';
import { Repository } from 'typeorm';
import { UpdateBreedDto } from './update-breed.dto';
import { CreateBreedDto } from './create-breed.dto';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async findAll(): Promise<Breed[] | HttpException> {
    try {
      return await this.breedRepository.find();
    } catch {
      return new HttpException(
        'An error occurred while attempting to retrieve all breeds',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number): Promise<Breed | HttpException> {
    try {
      const breed = await this.breedRepository.findOneBy({ id });
      if (breed == null) {
        return new HttpException(
          `No breed with id ${id} found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return breed;
    } catch {
      return new HttpException(
        `An error occurred while attempting to retrieve the breed with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async insert(breed: CreateBreedDto): Promise<void | HttpException> {
    const breedEntity = this.breedRepository.create(breed);
    try {
      await this.breedRepository.insert(breedEntity);
    } catch {
      return new HttpException(
        'Failed to insert breed due to a conflict in the database',
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(
    id: number,
    breed: UpdateBreedDto,
  ): Promise<void | HttpException> {
    try {
      const breedEntity = this.breedRepository.create(breed);
      await this.breedRepository.update(id, breedEntity);
    } catch {
      return new HttpException(
        'Failed to update breed due to a conflict in the database',
        HttpStatus.CONFLICT,
      );
    }
  }

  async delete(id: number): Promise<void | HttpException> {
    try {
      this.breedRepository.delete(id);
    } catch {
      return new HttpException(
        `An error occurred while attempting to delete the breed with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
