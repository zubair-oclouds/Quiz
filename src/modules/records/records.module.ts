import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([RecordsService])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
