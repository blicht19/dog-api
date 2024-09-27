import { Rating, Size } from 'src/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size?: Size;

  @Column()
  friendliness?: Rating;

  @Column()
  trainability?: Rating;

  @Column({ name: 'sheddingamount' })
  sheddingAmount?: Rating;

  @Column({ name: 'exerciseneeds' })
  exerciseNeeds?: Rating;
}
