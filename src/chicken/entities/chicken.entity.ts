import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  birthday: Date;

  @Column()
  weight: number;

  @Column({ default: 0 })
  steps: number;

  @Column({ default: false })
  isRunning: boolean;
}
