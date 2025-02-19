import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TreeNodeService } from './tree-node.service';
import { TreeNode } from '@prisma/client';

@Controller('tree-node')
export class TreeNodeController {
  constructor(private readonly treeService: TreeNodeService) {}

  @Post()
  create(
    @Body('label') label: string,
    @Body('parentId') parentId?: string,
  ): Promise<TreeNode> {
    return this.treeService.create(label, parentId);
  }

  @Get()
  findAll(): Promise<TreeNode[]> {
    return this.treeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TreeNode> {
    return this.treeService.findOne(id);
  }

  @Get('hierarchy/:id')
  async findHierarchy(@Param('id') id: string): Promise<TreeNode | null> {
    return this.treeService.findHierarchy(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('label') label: string,
  ): Promise<TreeNode> {
    return this.treeService.update(id, label);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TreeNode> {
    return this.treeService.remove(id);
  }
}
