import {
  Controller,
  HttpStatus,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DogService } from './dog.service';
import { returnOrThrowHttpException } from 'src/utils';
import { Dog } from './dog.entity';
import { CreateDogDto } from './create-dog.dto';
import { UpdateDogDto } from './update-dog.dto';

@ApiTags('Dogs')
@Controller('dogs/')
export class DogController {
  constructor(private dogService: DogService) {}

  @ApiOperation({ summary: 'Get a list of all dogs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a list of all dogs',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while attempting to retrieve all dogs',
  })
  @Get()
  async findAllDogs(): Promise<Dog[]> {
    const result = await this.dogService.findAll();
    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Add a new dog' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Dog created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Dog could not be added due to a conflict in the database',
  })
  @Post()
  async createDog(@Body() dog: CreateDogDto) {
    const result = await this.dogService.insert(dog);
    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Get the dog with the given id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the dog with given id',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while attempting to retrieve this dog',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No dog with this id was found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Get(':id')
  async getDogById(@Param('id') id: number): Promise<Dog> {
    const result = await this.dogService.findById(id);
    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Update the information about a dog' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dog updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Dog could not be updated due to a conflict in the database',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @Put(':id')
  async updateDog(@Param('id') id: number, @Body() dog: UpdateDogDto) {
    const result = await this.dogService.update(id, dog);
    return returnOrThrowHttpException(result);
  }

  @ApiOperation({ summary: 'Delete the dog with the given id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dog successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred while attempting to delete this dog',
  })
  @Delete(':id')
  async deleteDog(@Param('id') id: number) {
    const result = await this.dogService.delete(id);
    return returnOrThrowHttpException(result);
  }
}
