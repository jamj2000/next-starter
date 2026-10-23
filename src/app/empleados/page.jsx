import { getEmpleados } from "@/lib/data/empleados";
import { Suspense } from "react";
import { CreateEmpleado, UpdateEmpleado, DeleteEmpleado, ViewEmpleado } from "@/components/empleados/Actions";
import { InputHidden, InputSelect, List, Pagination, Submit, Table } from "@/components/simpleui";
import { CardEmpleado } from "@/components/empleados/CardEmpleado";
import Form from 'next/form'



export default function Page({ searchParams }) {

    return (
        <div className='container mx-auto'>
            <h1 className="text-4xl text-indigo-800 dark:text-indigo-300">Listado</h1>

            <Suspense fallback="Cargando datos...">
                <LoadData searchParams={searchParams} />
            </Suspense>

        </div >
    )
}






async function LoadData({ searchParams }) {

    const { sort, direction, page, limit } = await searchParams;
    const empleados = await getEmpleados({ sort, direction, page, limit })

    const lista = empleados?.data?.map(e => ({ ...e, activo: Boolean(e.activo) }))



    return (
        <div className="flex flex-col">

            <QueryForm
                page={page}
                limit={limit}
                sort={sort}
                direction={direction}
            />

            <Pagination pages={+empleados.pages} />


            {/* <h2 className="text-3xl text-indigo-800 dark:text-indigo-300 my-5">Table</h2> */}
            <Table
                prefix={'/empleados'}
                data={lista}
                columns={[
                    { name: "activo", label: "Activo" },
                    { name: "nombre", label: "Nombre" },
                    { name: "empresa", label: "Empresa" },
                    { name: "cargo", label: "Cargo" },
                ]}
                sort={sort}
                direction={direction}
                width={1400}
                actions={[
                    ViewEmpleado,
                    UpdateEmpleado,
                    DeleteEmpleado,
                ]}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-center inline">Tabla Empleados</h2>
                    <CreateEmpleado />
                </div>
            </Table >


            {/*  <h2 className="text-3xl text-indigo-800 dark:text-indigo-300 my-5">List</h2> */}
            <List
                prefix={'/empleado'}
                card={CardEmpleado}
                data={empleados.data}
                columns={[
                    { name: "nombre", label: "Nombre" },
                    { name: "empresa", label: "Empresa" },
                    { name: "cargo", label: "Cargo" },
                ]}
                sort={sort}
                direction={direction}
                actions={[
                    ViewEmpleado,
                    UpdateEmpleado,
                    DeleteEmpleado,
                ]}
            >
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-2xl text-center inline">Lista Empleados</h2>
                    <CreateEmpleado />
                </div>
            </List >


        </div >
    )
}





const QueryForm = ({ page, limit, sort, direction }) => (
    <Form action="" className="my-3 flex flex-col md:flex-row gap-4 justify-center items-center">
        <InputHidden name="page" value={page || 1} />
        <InputHidden name="limit" value={limit || 10} />
        <InputSelect
            label="Ordenar"
            name="sort"
            options={[
                ["Nombre", 'nombre', sort == 'nombre'],
                ["Empresa", 'empresa', sort == 'empresa'],
                ["Cargo", 'cargo', sort == 'cargo'],
            ]}
        />
        <InputSelect
            label="Dirección"
            name="direction"
            options={[
                ["Ascendente", "asc", direction == "asc"],
                ["Descendente", "desc", direction == "desc"]
            ]}
        />
        <Submit className="px-8">Consultar</Submit>
    </Form>

)