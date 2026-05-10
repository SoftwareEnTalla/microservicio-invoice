import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvoiceLifecycleController } from './invoice-lifecycle.controller';
import { InvoiceLifecycleService } from './invoice-lifecycle.service';

@Module({
  imports: [ConfigModule],
  controllers: [InvoiceLifecycleController],
  providers: [InvoiceLifecycleService],
  exports: [InvoiceLifecycleService],
})
export class InvoiceLifecycleModule {}