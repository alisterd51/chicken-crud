import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCoopDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Cluckingham Palace.',
    description: 'coop name',
  })
  readonly name: string;
}
