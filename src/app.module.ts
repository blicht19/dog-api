import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedModule } from './breed/breed.module';
import { DogModule } from './dog/dog.module';
import { HealthModule } from './health/health.module';

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
    HealthModule,
  ],
})
export class AppModule {}
