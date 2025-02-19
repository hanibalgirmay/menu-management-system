import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TreeNodeService } from './tree-node.service';

describe('LinksService', () => {
  let service: TreeNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeNodeService],
    }).compile();

    service = module.get<TreeNodeService>(TreeNodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
