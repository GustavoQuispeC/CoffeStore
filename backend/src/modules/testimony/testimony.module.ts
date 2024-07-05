import { Module } from '@nestjs/common';
import { TestimonyController } from './testimony.controller';
import { TestimonyService } from './testimony.service';

@Module({
  controllers: [TestimonyController],
  providers: [TestimonyService]
})
export class TestimonyModule {}
