'use server'

import prisma from '@/lib/prisma';
import { updateTag } from 'next/cache'
import { z } from 'zod'


const EmpleadoSchema = z.object({
    id: z.coerce.number().int().positive().optional(),
    nombre: z
        .string()
        .min(2, 'El nombre de empleado debe tener al menos 2 caracteres')
        .max(100),
    empresa: z
        .string()
        .min(3, 'El nombre de empresa debe tener al menos 3 caracteres')
        .max(100),
    cargo: z
        .string()
        .min(4, 'El nombre de cargo debe tener al menos 4 caracteres')
        .max(100),
    nivel: z.enum(['amateur', 'junior', 'senior', 'veterano']),
    aficiones: z
        .array(z.string())
        .min(1, 'Selecciona al menos una habilidad')
        .default([]),
})


// Para validar usaremos safeParse
// https://zod.dev/ERROR_HANDLING?id=zodparsedtype
// result puede ser de 2 tipos:
// { success: true, data: z.infer<typeof schema> } 
// { success: false, error: issues[] }  




function getEsKey(text) {
    if (!text) return null;
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quita diacríticos (tildes)
        .toLowerCase();
}







export async function createEmpleado(_prevState, formData) {
    // LEEMOS DATOS
    const data = {
        id: formData.get("id") || undefined,
        nombre: formData.get("nombre"),
        empresa: formData.get("empresa"),
        cargo: formData.get("cargo"),
        nivel: formData.get("nivel"),
        aficiones: formData.getAll("aficiones")
    }


    // VALIDAMOS DATOS
    const result = EmpleadoSchema.safeParse(data)


    // SI HAY ERRORES: devolvemos un objeto con las propiedades errors y values
    if (!result.success) {
        const { formErrors, fieldErrors } = z.flattenError(result.error);   // https://zod.dev/error-formatting?id=zflattenerror#zflattenerror
        // console.log('FieldErrors ', fieldErrors);
        return {
            type: "error",
            errors: fieldErrors,
            values: data,
            message: "Por favor, corrige los errores del formulario."
        }
    }


    // REALIZAMOS LA ACCIÓN SOBRE result.data
    try {
        const { nombre, empresa, cargo, nivel, aficiones } = result.data

        await prisma.empleado.create({
            data: {
                nombre,
                nombre_sort: getEsKey(nombre),
                empresa,
                cargo,
                nivel,
                aficiones: JSON.stringify(aficiones),
            },
        })

        updateTag('empleados')

        return {
            type: 'success',
            message: 'Empleado creado correctamente.',
        }
    } catch (error) {
        console.log("Error en empleados:", error);
        return {
            type: 'error',
            message: 'Ha ocurrido un error al procesar la operación.'
        }
    }
}



export async function updateEmpleado(_prevState, formData) {
    // LEEMOS DATOS
    const data = {
        id: formData.get("id") || undefined,
        nombre: formData.get("nombre"),
        empresa: formData.get("empresa"),
        cargo: formData.get("cargo"),
        nivel: formData.get("nivel"),
        aficiones: formData.getAll("aficiones")
    }


    // VALIDAMOS DATOS
    const result = EmpleadoSchema.safeParse(data)


    // SI HAY ERRORES: devolvemos un objeto con las propiedades errors y values
    if (!result.success) {
        const { formErrors, fieldErrors } = z.flattenError(result.error);   // https://zod.dev/error-formatting?id=zflattenerror#zflattenerror
        // console.log('FieldErrors ', fieldErrors);
        return {
            type: "error",
            errors: fieldErrors,
            values: data,
            message: "Por favor, corrige los errores del formulario."
        }
    }


    // REALIZAMOS LA ACCIÓN SOBRE result.data
    try {
        const { id, nombre, empresa, cargo, nivel, aficiones } = result.data

        await prisma.empleado.update({
            where: { id },
            data: {
                nombre,
                nombre_sort: getEsKey(nombre),
                empresa,
                cargo,
                nivel,
                aficiones: JSON.stringify(aficiones),
            },
        })

        updateTag('empleados')

        return {
            type: 'success',
            values: data,
            message: 'Empleado actualizado correctamente.',
        }
    } catch (error) {
        console.log("Error en empleados:", error);
        return {
            type: 'error',
            message: 'Ha ocurrido un error al procesar la operación.'
        }
    }
}



export async function deleteEmpleado(_prevState, formData) {
    const id = z.coerce.number().int().positive().safeParse(
        formData.get('id'),
    )

    if (!id.success) {
        return {
            type: 'error',
            message: 'El ID del empleado no es válido.',
        }
    }

    try {
        await prisma.empleado.delete({
            where: { id: id.data },
        })

        updateTag('empleados')

        return {
            type: 'success',
            message: 'Empleado eliminado correctamente.',
        }
    } catch (error) {
        console.log("Error en empleados:", error);
        return {
            type: 'error',
            message: 'Ha ocurrido un error al procesar la operación.'
        }
    }
}



export async function toggleEmpleadoActivo(id, activo) {
    try {
        await prisma.empleado.update({
            where: { id },
            data: { activo },
        })

        updateTag('empleados')

        return {
            type: 'success',
            message: 'Estado del empleado actualizado correctamente.',
        }
    } catch (error) {
        console.log("Error en empleados:", error);
        return {
            type: 'error',
            message: 'Ha ocurrido un error al procesar la operación.'
        }
    }
}
