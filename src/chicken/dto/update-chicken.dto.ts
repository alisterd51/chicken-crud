import { PartialType } from '@nestjs/mapped-types';
import { CreateChickenDto } from './create-chicken.dto';

export class UpdateChickenDto extends PartialType(CreateChickenDto) {}
