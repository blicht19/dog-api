import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedModule } from './breed/breed.module';
import { DogModule } from './dog/dog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'dogs',
      autoLoadEntities: true,
      synchronize: false,
    }),
    BreedModule,
    DogModule,
  ],
})
export class AppModule {}
