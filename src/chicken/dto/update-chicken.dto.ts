import { PartialType } from '@nestjs/swagger';
import { CreateChickenDto } from './create-chicken.dto';

export class UpdateChickenDto extends PartialType(CreateChickenDto) {}
