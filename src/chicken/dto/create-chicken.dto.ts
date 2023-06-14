import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDate, IsBoolean } from 'class-validator';


export class CreateChickenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john',
    description: 'name',
  })
  readonly name: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'birthday',
  })
  readonly birthday: Date;

  @IsNumber()
  @ApiProperty({
    description: 'weight',
  })
  weight: number;

  @IsOptional()
  @IsNumber()
  steps: number;

  @IsOptional()
  @IsBoolean()
  isRunning: boolean;
}
