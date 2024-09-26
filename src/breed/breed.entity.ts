import { rating } from 'src/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size?: 'Tiny' | 'Small' | 'Medium' | 'Large';

  @Column()
  friendliness?: rating;

  @Column()
  trainability?: rating;

  @Column({ name: 'sheddingamount' })
  sheddingAmount?: rating;

  @Column({ name: 'exerciseneeds' })
  exerciseNeeds?: rating;
}
