import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './dog.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breed/breed.entity';
import { BreedService } from 'src/breed/breed.service';
import { CreateDogDto } from './create-dog.dto';
import { UpdateDogDto } from './update-dog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog) private dogRepository: Repository<Dog>,
    private breedService: BreedService,
  ) {}

  async findAll(): Promise<Dog[] | HttpException> {
    try {
      return await this.dogRepository.find();
    } catch {
      return new HttpException(
        'An error occurred while attempting to retrieve all dogs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number): Promise<Dog | HttpException> {
    try {
      const dog = await this.dogRepository.findOneBy({ id });
      if (dog == null) {
        return new HttpException(
          `No dog with id ${id} found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return dog;
    } catch {
      return new HttpException(
        `An error occurred while attempting to retrieve the dog with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBreedInfo(breedId: number): Promise<Breed | false> {
    const breedInfo = await this.breedService.findById(breedId);

    if (breedInfo instanceof Breed) {
      return breedInfo;
    }

    return false;
  }

  async createDogEntity(
    dogDto: CreateDogDto | UpdateDogDto,
    breedId?: number,
  ): Promise<Dog | HttpException> {
    const dogEntity = this.dogRepository.create({
      name: dogDto.name,
      age: dogDto.age,
      gender: dogDto.gender,
      color: dogDto.color,
      favoriteFood: dogDto.favoriteFood,
      favoriteToy: dogDto.favoriteToy,
    });

    if (breedId != null) {
      const breed = await this.getBreedInfo(breedId);
      if (!breed) {
        return new HttpException(
          `No breed with id ${breedId} found`,
          HttpStatus.BAD_REQUEST,
        );
      }
      dogEntity.breed = breed;
    }

    return dogEntity;
  }

  async insert(dog: CreateDogDto): Promise<void | HttpException> {
    const dogEntity = await this.createDogEntity(dog, dog.breed);
    if (dogEntity instanceof HttpException) {
      return dogEntity;
    }

    if (!dogEntity.name) {
      throw new HttpException('Dog name is required', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.dogRepository.insert(dogEntity);
    } catch {
      return new HttpException(
        'Failed to insert dog due to a conflict in the database',
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(id: number, dog: UpdateDogDto): Promise<void | HttpException> {
    const dogEntity = await this.createDogEntity(dog, dog.breed);
    if (dogEntity instanceof HttpException) {
      return dogEntity;
    }

    if (dog.breed != null) {
      const breed = await this.getBreedInfo(dog.breed);
      if (!breed) {
        return new HttpException(
          `No breed with id ${dog.breed} found`,
          HttpStatus.BAD_REQUEST,
        );
      }
      dogEntity.breed = breed;
    }

    try {
      await this.dogRepository.update(id, dogEntity);
    } catch {
      return new HttpException(
        'Failed to update dog due to a conflict in the database',
        HttpStatus.CONFLICT,
      );
    }
  }

  async delete(id: number): Promise<void | HttpException> {
    try {
      await this.dogRepository.delete(id);
    } catch {
      return new HttpException(
        `An error occurred while attempting to delete the breed with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
