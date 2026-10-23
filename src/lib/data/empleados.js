'use server';

import prisma from '@/lib/prisma';
import { cacheTag } from 'next/cache';




export async function getAllEmpleados() {
    'use cache';
    cacheTag('empleados');

    return prisma.empleado.findMany({
        orderBy: {
            nombre_sort: 'asc',
        },
    });
}




export async function getEmpleados({
    sort = 'nombre',
    direction = 'asc',
    page = 1,
    limit = 10,
} = {}) {
    'use cache';
    cacheTag('empleados', page.toString(), limit.toString());

    const allowedSorts = [
        'id',
        'nombre',
        'empresa',
        'cargo',
    ];

    const sortColumn =
        allowedSorts.includes(sort)
            ? sort === 'nombre'
                ? 'nombre_sort'
                : sort
            : 'id';

    const sortDirection =
        direction.toLowerCase() === 'desc' ? 'desc' : 'asc';

    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const skip = (currentPage - 1) * pageSize;

    const orderBy = {
        [sortColumn]: sortDirection,
    };

    const [empleados, total] = await prisma.$transaction([
        prisma.empleado.findMany({
            orderBy,
            skip,
            take: pageSize,
        }),
        prisma.empleado.count(),
    ]);

    const data = empleados.map((empleado) => ({
        ...empleado,
        aficiones: empleado.aficiones
            ? JSON.parse(empleado.aficiones)
            : [],
    }));

    return {
        data,
        total,
        page: currentPage,
        limit: pageSize,
        sort,
        direction: sortDirection,
        pages: Math.ceil(total / pageSize),
    };
}



export async function getEmpleado(id) {
    'use cache';
    cacheTag('empleados', `empleado-${id}`);

    const empleado = await prisma.empleado.findUnique({
        where: {
            id: Number(id),
        },
    });

    return empleado
        ? {
            ...empleado,
            aficiones: empleado.aficiones
                ? JSON.parse(empleado.aficiones)
                : [],
        }
        : null;
}
