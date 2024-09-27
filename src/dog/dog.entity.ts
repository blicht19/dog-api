import { Breed } from 'src/breed/breed.entity';
import { Gender } from 'src/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age?: number;

  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true,
  })
  @JoinColumn({ name: 'breed' })
  breed?: Breed;

  @Column()
  gender?: Gender;

  @Column()
  color?: string;

  @Column({ name: 'favoritefood' })
  favoriteFood?: string;

  @Column({ name: 'favoritetoy' })
  favoriteToy?: string;
}
