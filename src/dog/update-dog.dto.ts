import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/types';

export class UpdateDogDto {
  name?: string;
  age?: number;
  breed?: number;
  @ApiProperty({ enum: ['Male', 'Female', 'Unknown'] })
  gender?: Gender;
  color?: string;
  favoriteFood?: string;
  favoriteToy?: string;
}
