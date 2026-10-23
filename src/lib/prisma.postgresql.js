import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

const prisma = globalThis.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;



/*
Nota sobre entornos Serverless (Opcional)
Si en el futuro necesitas desplegar tu aplicación en entornos Serverless (Edge networks como Vercel o Cloudflare Workers) y quieres utilizar adaptadores de controladores por compatibilidad con conexiones TCP/HTTP, el código cambiaría ligeramente para importar adaptadores específicos:

Para PostgreSQL (usando el módulo pg y su adaptador):

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma =  PrismaClient({ adapter });

*/