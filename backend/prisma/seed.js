"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Ejecutando seed...');
    const roles = [
        {
            nombre: 'ADMIN_SAAS',
            descripcion: 'Administrador global del SaaS',
        },
        {
            nombre: 'ADMIN',
            descripcion: 'Administrador de empresa',
        },
        {
            nombre: 'ADMIN_EMPRESA',
            descripcion: 'Administrador operativo',
        },
        {
            nombre: 'VENDEDOR',
            descripcion: 'Usuario vendedor',
        },
    ];
    const rolesDB = {};
    for (const rol of roles) {
        const registro = await prisma.roles.upsert({
            where: {
                nombre: rol.nombre,
            },
            update: {},
            create: rol,
        });
        rolesDB[rol.nombre] =
            registro;
    }
    const empresa = await prisma.empresas.upsert({
        where: {
            email: 'admin@t420.local',
        },
        update: {},
        create: {
            razon_social: 'T420 Demo',
            nombre_comercial: 'T420 Demo',
            email: 'admin@t420.local',
            plan_saas: 'TRIAL',
            estado: true,
        },
    });
    const passwordHash = await bcrypt.hash('Admin123456', 10);
    await prisma.usuarios.upsert({
        where: {
            email: 'admin@t420.local',
        },
        update: {
            id_empresa: empresa.id_empresa,
            id_rol: rolesDB.ADMIN_SAAS.id_rol,
            password_hash: passwordHash,
        },
        create: {
            id_empresa: empresa.id_empresa,
            id_rol: rolesDB.ADMIN_SAAS.id_rol,
            nombre: 'Administrador',
            apellido: 'Principal',
            email: 'admin@t420.local',
            password_hash: passwordHash,
            estado: true,
            email_verificado: true,
        },
    });
    console.log('✅ Seed terminado');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map