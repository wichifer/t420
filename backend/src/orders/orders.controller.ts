//C:\dev\ordenes-saas-backend\src\orders\orders.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Delete,
  Patch,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersPdfService } from './orders-pdf.service';
import type { Response } from 'express';
@UseGuards(JwtGuard)

@Controller('orders')

export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersPdfService: OrdersPdfService,
  ) {}

  @Get()
  findAll(@Req() request: any) {

    return this.ordersService.findAll(
      request.user.id_empresa,
    );

  }
  @Get('pdf')
  async generatePdf(
    @Query('fecha') fecha: string,
    @Req() request: any,
    @Res() response: Response,
  ) {
    const pdf = await this.ordersPdfService.generatePdf(
      fecha,
      request.user.id_empresa,
    );

    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="ordenes-${fecha}.pdf"`,
      'Content-Length': pdf.length,
    });

    response.end(pdf);
  }

  @Get(':id')
  findOne(
  @Param('id') id: string,
  @Req() request: any,
) {

  return this.ordersService.findOne(
    id,
    request.user.id_empresa,
  );

}

  @Post()
  create(
    @Body() body: CreateOrderDto,
    @Req() request: any,
  ) {

    return this.ordersService.create(
      body,
      request.user,
    );

  }
  
@Post(":id/approve")
approve(
  @Param("id") id: string,
  @Req() request: any,
) {
  return this.ordersService.update(
    id,
    { estado: "APROBADA" },
    request.user.id_empresa,
  );
}
  @Delete(':id')
  remove(

    @Param('id') id: string,

    @Req() request: any,

  ) {

    return this.ordersService.remove(
      id,
      request.user.id_empresa,
    );

  }
  @Patch(':id')
update(

  @Param('id') id: string,

  @Body() body: UpdateOrderDto,

  @Req() request: any,

) {
console.log(
 'UPDATE ORDER',
 id,
 //data,
 new Date()
);
  return this.ordersService.update(
    id,
    body,
    request.user.id_empresa,
  );

}
}
