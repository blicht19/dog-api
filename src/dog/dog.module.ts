import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './dog.entity';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { BreedModule } from 'src/breed/breed.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dog]), BreedModule],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
