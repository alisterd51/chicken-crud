import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDate, IsBoolean, IsDateString, IsPositive, min, Min } from 'class-validator';


export class CreateChickenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john',
    description: 'name',
  })
  readonly name: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'birthday',
  })
  readonly birthday: Date;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'weight',
  })
  readonly weight: number;

  @IsOptional()
  @IsNumber()
  readonly steps: number;

  @IsOptional()
  @IsBoolean()
  readonly isRunning: boolean;
}
