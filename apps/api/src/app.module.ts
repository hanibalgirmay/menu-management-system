import { Module } from '@nestjs/common';

import { TreeNodeModule } from './TreeNode/tree-node.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [TreeNodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
