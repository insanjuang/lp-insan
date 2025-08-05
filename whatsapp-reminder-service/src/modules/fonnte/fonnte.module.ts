import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FontteService } from './fonnte.service';

@Module({
  imports: [HttpModule],
  providers: [FontteService],
  exports: [FontteService],
})
export class FontteModule {}