import { Chicken } from "src/chicken/entities/chicken.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Coop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Chicken, (chicken) => chicken.coop)
  chickens: Chicken[];
}
