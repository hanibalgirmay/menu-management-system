import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';

import { TreeNodeController } from './tree-node.controller';
import { TreeNodeService } from './tree-node.service';

describe('TreeNodeController', () => {
  let controller: TreeNodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreeNodeController],
      providers: [TreeNodeService],
    }).compile();

    controller = module.get<TreeNodeController>(TreeNodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
