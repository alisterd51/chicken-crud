import { ApiProperty } from '@nestjs/swagger';
import { Coop } from 'src/coop/entities/coop.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chicken {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: '42',
    description: 'id',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'john',
    description: 'name',
  })
  name: string;

  @Column('date', {nullable: true})
  @ApiProperty({
    example: '2023-06-16',
    description: 'birthday',
  })
  birthday: Date;

  @Column()
  @ApiProperty({
    example: 42,
    description: 'weight',
  })
  weight: number;

  @Column({ default: 0 })
  @ApiProperty({
    example: 0,
    description: 'steps',
  })
  steps: number;

  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: 'is running',
  })
  isRunning: boolean;

  @ManyToOne(() => Coop, (coop) => coop.chickens)
  coop: Coop;
}
