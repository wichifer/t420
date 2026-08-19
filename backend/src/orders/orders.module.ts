import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersPdfService } from './orders-pdf.service';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AuditModule,
  ],

  controllers: [
    OrdersController,
  ],

  providers: [
    OrdersService,
    OrdersPdfService,
  ],
})
export class OrdersModule {}
