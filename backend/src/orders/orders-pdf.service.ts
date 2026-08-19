import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import PDFDocument from 'pdfkit';

@Injectable()
export class OrdersPdfService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async generatePdf(
    fecha: string,
    id_empresa: string,
  ): Promise<Buffer> {
    const inicio = new Date(`${fecha}T00:00:00`);
    const fin = new Date(`${fecha}T23:59:59.999`);

    const orders =
      await this.prisma.ordenes_compra.findMany({
        where: {
          id_empresa: BigInt(id_empresa),
          deleted_at: null,

          fecha: {
            gte: inicio,
            lte: fin,
          },
        },

        include: {
          clientes: true,

          usuarios: {
            select: {
              nombre: true,
              apellido: true,
            },
          },

          detalle_orden_compra: {
            include: {
              articulos: {
                select: {
                  codigo: true,
                },
              },
            },
          },
        },

        orderBy: {
          id_orden_compra: 'asc',
        },
      });

    if (orders.length === 0) {
      throw new NotFoundException(
        `No hay órdenes para la fecha ${fecha}`,
      );
    }

    const chunks: Buffer[] = [];

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true,
    });

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    const pdfFinished = new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on('error', reject);
    });

    /*
    ==================================================
    CONSTANTES DE PÁGINA
    ==================================================
    */

    const PAGE_WIDTH = 595.28;

    const MARGIN_LEFT = 40;
    const MARGIN_RIGHT = 40;

    const CONTENT_WIDTH =
      PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

    // Debe quedar dentro del área imprimible de A4.
    const FOOTER_Y = 775;

    /*
    ==================================================
    CONTROL DE ESPACIO
    ==================================================
    */

    const ensureSpace = (requiredHeight: number) => {
      const bottomLimit = FOOTER_Y - 20;

      if (doc.y + requiredHeight > bottomLimit) {
        doc.addPage();
      }
    };

    /*
    ==================================================
    ENCABEZADO GENERAL
    ==================================================
    */

    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text(
        'ÓRDENES DE COMPRA',
        MARGIN_LEFT,
        doc.y,
        {
          width: CONTENT_WIDTH,
          align: 'center',
        },
      );

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .font('Helvetica')
      .text(
        `Fecha: ${fecha}`,
        MARGIN_LEFT,
        doc.y,
        {
          width: CONTENT_WIDTH,
          align: 'center',
        },
      );

    doc.moveDown();

    doc
      .fontSize(10)
      .text(
        `Cantidad de órdenes: ${orders.length}`,
        MARGIN_LEFT,
        doc.y,
        {
          width: CONTENT_WIDTH,
          align: 'left',
        },
      );

    doc.moveDown();

    /*
    ==================================================
    ÓRDENES
    ==================================================
    */

    let totalGeneral = 0;

    for (const order of orders) {
      /*
      --------------------------------------------------
      DATOS DE ORDEN
      --------------------------------------------------
      */

      const cliente =
        order.clientes?.razon_social?.trim() ||
        [
          order.clientes?.nombre,
          order.clientes?.apellido,
        ]
          .filter(Boolean)
          .join(' ')
          .trim() ||
        'Sin cliente';

      const usuario =
        [
          order.usuarios?.nombre,
          order.usuarios?.apellido,
        ]
          .filter(Boolean)
          .join(' ')
          .trim() || '-';

      const total = Number(order.total);

      totalGeneral += total;

      /*
      --------------------------------------------------
      ESPACIO PARA CABECERA
      --------------------------------------------------
      */

      ensureSpace(100);

      /*
      --------------------------------------------------
      CABECERA DE ORDEN
      --------------------------------------------------
      */

      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .text(
          `${order.numero_orden}  —  ${cliente}`,
          MARGIN_LEFT,
          doc.y,
          {
            width: CONTENT_WIDTH,
            align: 'left',
          },
        );

      doc
        .fontSize(9)
        .font('Helvetica')
        .text(
          `Fecha: ${
            order.fecha
              ? new Date(
                  order.fecha,
                ).toLocaleString('es-AR')
              : '-'
          }`,
          MARGIN_LEFT,
          doc.y,
          {
            width: CONTENT_WIDTH,
            align: 'left',
          },
        );

      doc.text(
        `Estado: ${order.estado}    Usuario: ${usuario}`,
        MARGIN_LEFT,
        doc.y,
        {
          width: CONTENT_WIDTH,
          align: 'left',
        },
      );

      if (order.observaciones) {
        doc.text(
          `Observaciones: ${order.observaciones}`,
          MARGIN_LEFT,
          doc.y,
          {
            width: CONTENT_WIDTH,
            align: 'left',
          },
        );
      }

      doc.moveDown(0.4);

      /*
      --------------------------------------------------
      CABECERA DEL DETALLE
      --------------------------------------------------
      */

      doc
        .font('Helvetica-Bold')
        .fontSize(9);

      const headerY = doc.y;

      doc.text(
        'Descripción',
        40,
        headerY,
        {
          width: 240,
          align: 'left',
        },
      );

      doc.text(
        'Cant.',
        280,
        headerY,
        {
          width: 45,
          align: 'left',
        },
      );

      doc.text(
        'P. Unit.',
        330,
        headerY,
        {
          width: 80,
          align: 'right',
        },
      );

      doc.text(
        'Subtotal',
        415,
        headerY,
        {
          width: 130,
          align: 'right',
        },
      );

      doc.moveDown(0.3);

      doc
        .moveTo(40, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(0.3);

      /*
      --------------------------------------------------
      DETALLE DE ARTÍCULOS
      --------------------------------------------------
      */

      doc
        .font('Helvetica')
        .fontSize(9);

      for (
        const item of order.detalle_orden_compra
      ) {
        const descripcion =
          item.descripcion_articulo || '-';

        const codigo =
          item.articulos?.codigo || '-';

        const cantidad =
          Number(item.cantidad);

        const precio =
          Number(item.precio_unitario);

        const subtotal =
          Number(item.subtotal);

        /*
        ----------------------------------------------
        ALTURA NECESARIA
        ----------------------------------------------
        */

        const descriptionHeight =
          doc.heightOfString(
            descripcion,
            {
              width: 230,
            },
          );

        const itemHeight =
          Math.max(
            descriptionHeight,
            12,
          ) + 18;

        ensureSpace(itemHeight + 5);

        const y = doc.y;

        /*
        ----------------------------------------------
        DESCRIPCIÓN
        ----------------------------------------------
        */

        doc
          .fontSize(9)
          .font('Helvetica')
          .text(
            descripcion,
            40,
            y,
            {
              width: 230,
              align: 'left',
            },
          );

        /*
        ----------------------------------------------
        CÓDIGO DE BARRAS / EAN
        ----------------------------------------------
        */

        doc
          .fontSize(8)
          .font('Helvetica')
          .text(
            `EAN: ${codigo}`,
            40,
            y + descriptionHeight + 1,
            {
              width: 230,
              align: 'left',
            },
          );

        /*
        ----------------------------------------------
        CANTIDAD
        ----------------------------------------------
        */

        doc
          .fontSize(9)
          .text(
            String(cantidad),
            280,
            y,
            {
              width: 45,
              align: 'left',
            },
          );

        /*
        ----------------------------------------------
        PRECIO UNITARIO
        ----------------------------------------------
        */

        doc.text(
          `$${precio.toLocaleString(
            'es-AR',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}`,
          330,
          y,
          {
            width: 80,
            align: 'right',
          },
        );

        /*
        ----------------------------------------------
        SUBTOTAL
        ----------------------------------------------
        */

        doc.text(
          `$${subtotal.toLocaleString(
            'es-AR',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}`,
          415,
          y,
          {
            width: 130,
            align: 'right',
          },
        );

        /*
        ----------------------------------------------
        AVANZAR DESPUÉS DEL EAN
        ----------------------------------------------
        */

        doc.y =
          y +
          Math.max(
            descriptionHeight + 12,
            22,
          );
      }

      /*
      --------------------------------------------------
      TOTAL DE LA ORDEN
      --------------------------------------------------
      */

      ensureSpace(50);

      doc.moveDown(0.2);

      doc
        .font('Helvetica-Bold')
        .fontSize(10)
        .text(
          `TOTAL ORDEN: $${total.toLocaleString(
            'es-AR',
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          )}`,
          MARGIN_LEFT,
          doc.y,
          {
            width: CONTENT_WIDTH,
            align: 'right',
          },
        );

      doc.moveDown(0.8);

      doc
        .moveTo(40, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(0.8);
    }

    /*
    ==================================================
    TOTAL GENERAL
    ==================================================
    */

    ensureSpace(50);

    doc.moveDown();

    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(
        `TOTAL GENERAL: $${totalGeneral.toLocaleString(
          'es-AR',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )}`,
        MARGIN_LEFT,
        doc.y,
        {
          width: CONTENT_WIDTH,
          align: 'right',
        },
      );

    /*
    ==================================================
    NUMERACIÓN DE PÁGINAS
    ==================================================
    */

    const range = doc.bufferedPageRange();

    for (
      let i = range.start;
      i < range.start + range.count;
      i++
    ) {
      doc.switchToPage(i);

      doc
        .fontSize(8)
        .font('Helvetica')
        .text(
          `Página ${
            i - range.start + 1
          } de ${range.count}`,
          MARGIN_LEFT,
          FOOTER_Y,
          {
            align: 'center',
            width: CONTENT_WIDTH,
          },
        );
    }

    /*
    ==================================================
    FINALIZAR
    ==================================================
    */

    doc.end();

    return pdfFinished;
  }
}
