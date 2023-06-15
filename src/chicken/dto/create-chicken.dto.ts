import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    example: '2023-06-15',
    description: 'optional birthday',
  })
  readonly birthday: Date;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 0,
    description: 'weight',
  })
  readonly weight: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    example: 0,
    description: 'optional steps',
  })
  readonly steps: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    example: false,
    description: 'optional is running',
  })
  readonly isRunning: boolean;
}
