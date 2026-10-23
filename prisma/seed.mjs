
import { fakerES as faker } from "@faker-js/faker";
import { PrismaClient } from "../src/generated/prisma/client";

// --- SQLite
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const connectionString = process.env.DATABASE_URL ?? "file:./database.sqlite";
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });


// --- Postgresql
// import { PrismaPg } from '@prisma/adapter-pg';

// const connectionString = process.env.DATABASE_URL ?? "postgresql://user:password@localhost:5432/database";
// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });



// --------------- Datos aleatorios

export function crearEmpleadoAleatorio() {
    return {
        nombre: faker.person.fullName(),
        empresa: faker.company.name(),
        cargo: faker.person.jobTitle(),

        nivel: faker.helpers.arrayElement([
            "amateur",
            "junior",
            "senior",
            "veterano",
        ]),

        aficiones: JSON.stringify(
            faker.helpers.arrayElements(
                ["leer", "deporte", "cine", "playa"],
                { min: 1, max: 4 }
            )
        ),

        activo: faker.datatype.boolean(0.9),
    };
}

export const empleados = faker.helpers.multiple(
    crearEmpleadoAleatorio,
    { count: 500 }
);

// --------------- Normalización del nombre

function getEsKey(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// --------------- Inserción en la base de datos

async function main() {
    // Vacía la tabla antes de generar los datos nuevos.
    await prisma.empleado.deleteMany();

    await prisma.$transaction(
        async (tx) => {
            for (const empleado of empleados) {
                await tx.empleado.create({
                    data: {
                        ...empleado,
                        nombre_sort: getEsKey(empleado.nombre),
                    },
                });
            }
        },
        {
            maxWait: 10000,
            timeout: 60000,
        }
    );

    const resultados = await prisma.empleado.findMany({
        select: {
            nombre: true,
            empresa: true,
        },
        orderBy: {
            nombre_sort: "asc",
        },
    });

    console.log(resultados);
    console.log("✅ Empleados insertados:", empleados.length);
}


main()
    .catch((error) => {
        console.error("❌ Error al insertar empleados:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
