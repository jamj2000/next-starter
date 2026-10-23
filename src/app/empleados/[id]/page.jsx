import { Suspense } from "react"
import { getEmpleados, getEmpleado } from "@/lib/data/empleados";
import { BackLink, LeftArrowIcon, Spinner } from "@/components/simpleui";
import { notFound } from "next/navigation";
import { InfoEmpleado } from "@/components/empleados/InfoEmpleado";






export default function Page({ params }) {

    return (
        <div className='container mx-auto px-4 py-10'>

            <h1 className='flex gap-2 items-center w-full py-2 mb-8 border-b-4 border-blue-100 text-4xl text-blue-400 font-bold'>
                <BackLink className="text-xl"><LeftArrowIcon className="size-16" /></BackLink> INFORMACIÓN DE EMPLEADO
            </h1>

            <Suspense fallback={<Spinner />}>
                <Content params={params} />
            </Suspense>
        </div>
    )
}





export const Content = async ({ params }) => {
    const { id } = await params

    const empleado = await getEmpleado(id)

    if (!empleado) notFound()

    return <InfoEmpleado empleado={empleado} />
}

