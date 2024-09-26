import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BreedService } from './breed.service';
import { type Breed } from './breed.entity';

@ApiTags('Breeds')
@Controller('breeds/')
export class BreedController {
  constructor(private breedService: BreedService) {}

  @ApiOperation({ summary: 'Get a list of all dog breeds' })
  @ApiResponse({ status: 200, description: 'Returns a list of all dog breeds' })
  @Get()
  async findAll(): Promise<Breed[]> {
    return this.breedService.findAll();
  }
}
