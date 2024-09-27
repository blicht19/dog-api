import { ApiProperty } from '@nestjs/swagger';
import { Rating, Size } from 'src/types';

export class UpdateBreedDto {
  name?: string;
  @ApiProperty({ enum: ['Tiny', 'Small', 'Medium', 'Large'] })
  size?: Size;
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 5 })
  friendliness?: Rating;
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 5 })
  trainability?: Rating;
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 5 })
  sheddingAmount?: Rating;
  @ApiProperty({ type: 'integer', minimum: 1, maximum: 5 })
  exerciseNeeds?: Rating;
}
