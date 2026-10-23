'use client'

import { DeleteEmpleado, UpdateEmpleado } from "@/components/empleados/Actions"
import { Switch } from "@/components/simpleui"
import { toggleEmpleadoActivo } from "@/lib/actions/empleados"


export const InfoEmpleado = ({ empleado }) => {
    return (

        <div className='flex flex-col gap-2'>

            <div className='flex gap-2 self-end'>
                <UpdateEmpleado data={empleado} />
                <DeleteEmpleado data={empleado} />
            </div>

            <div className="flex flex-col gap-2">
                <p className='text-3xl'>{empleado.nombre}</p>
                <p>Empresa: {empleado.empresa}</p>
                <p>Cargo: {empleado.cargo}</p>
                <p>Nivel: {empleado.nivel}</p>
                <p>Aficiones: {empleado.aficiones.join(', ')}</p>

                <Switch
                    labelOn="Activo"
                    labelOff="Inactivo"
                    value={empleado.activo}
                    onChange={(value) => toggleEmpleadoActivo(empleado.id, value)}
                />


            </div>

        </div >


    )
}