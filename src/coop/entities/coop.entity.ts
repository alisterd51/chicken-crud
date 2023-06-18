import { ApiProperty } from "@nestjs/swagger";
import { Chicken } from "../../chicken/entities/chicken.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Coop {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'coop id',
  })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    example: 'Cluckingham Palace.',
    description: 'coop name',
  })
  name: string;

  @OneToMany(() => Chicken, (chicken) => chicken.coop)
  @ApiProperty({
    example: [Chicken],
    description: 'all chickens in this coop',
  })
  chickens: Chicken[];
}
