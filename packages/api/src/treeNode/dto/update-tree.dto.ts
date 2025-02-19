import { PartialType } from '@nestjs/mapped-types';

import { CreateLinkDto } from './create-tree.dto';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {}
