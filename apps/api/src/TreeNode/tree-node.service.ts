import { Injectable } from '@nestjs/common';
import { TreeNode } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TreeNodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(label: string, parentId?: string): Promise<TreeNode> {
    const newNode = await this.prisma.treeNode.create({
      data: {
        label,
        parentId: parentId || null,
      },
    });
    // if parent is present
    if (parentId) {
      await this.prisma.treeNode.update({
        where: { id: parentId },
        data: {
          children: {
            connect: {
              id: newNode.id,
            },
          },
        },
      });
    }

    return newNode;
  }

  async findAll(): Promise<TreeNode[]> {
    return await this.prisma.treeNode.findMany({
      include: {
        children: true,
      },
    });
  }

  async findOne(id: string): Promise<TreeNode> {
    return await this.prisma.treeNode.findUnique({
      where: { id },
      include: {
        children: true,
      },
    });
  }

  async findHierarchy(id: string): Promise<TreeNode | null> {
    const node = await this.prisma.treeNode.findUnique({
      where: { id },
      include: {
        children: true, // Include children for the current node
      },
    });

    if (!node) return null;

    // Recursively fetch children
    node.children = await Promise.all(
      node.children.map((child) => this.findHierarchy(child.id)),
    );

    return node;
  }

  async update(id: string, label: string): Promise<TreeNode> {
    return await this.prisma.treeNode.update({
      where: { id },
      data: { label },
    });
  }

  async remove(id: string): Promise<TreeNode> {
    return await this.prisma.treeNode.delete({
      where: { id },
    });
  }
}
