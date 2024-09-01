import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PenerimaanProvider } from 'src/providers/penerimaan.providers';
import { PenerimaanController } from './penerimaan.controller';
import { PenerimaanService } from './penerimaan.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PenerimaanController],
  providers: [...PenerimaanProvider, PenerimaanService],
})
export class PenerimaanModule {}
