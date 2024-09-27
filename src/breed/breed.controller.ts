import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BreedService } from './breed.service';
import { type Breed } from './breed.entity';
import { UpdateBreedDto } from './update-breed.dto';
import { CreateBreedDto } from './create-breed.dto';
import { returnOrThrowHttpException } from 'src/utils';

@ApiTags('Breeds')
@Controller('breeds/')
export class BreedController {
  constructor(private breedService: BreedService) {}

  @ApiOperation({ summary: 'Get a list of all dog breeds' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of all dog breeds',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'An error occurred while attempting to retrieve all dog breeds',
  })
  @Get()
  async findAllBreeds(): Promise<Breed[]> {
    const result = await this.breedService.findAll();

    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Add a new breed' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Breed created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Breed could not be added due to a conflict in the database',
  })
  @Post()
  async createBreed(@Body() breed: CreateBreedDto) {
    const result = await this.breedService.insert(breed);
    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Get the dog breed with the given id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the breed with given id',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'An error occurred while attempting to retrieve this dog breed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No breed with this id was found',
  })
  @Get(':id')
  async getBreedById(@Param('id') id: number) {
    const result = await this.breedService.findById(id);
    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Update the information about a dog breed' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dog breed updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Breed could not be updated due to a conflict in the database',
  })
  @Put(':id')
  async updateBreed(@Param('id') id: number, @Body() breed: UpdateBreedDto) {
    const result = await this.breedService.update(id, breed);
    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Delete the dog breed with the given id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dog breed successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while attempting to delete this dog breed',
  })
  @Delete(':id')
  async deleteBreed(@Param('id') id: number) {
    const result = this.breedService.delete(id);
    return returnOrThrowHttpException(result);
  }
}
