import { Module } from '@nestjs/common';

import { TreeNodeService } from './tree-node.service';
import { TreeNodeController } from './tree-node.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TreeNodeController],
  providers: [TreeNodeService, PrismaService],
  exports: [TreeNodeService],
})
export class TreeNodeModule {}
