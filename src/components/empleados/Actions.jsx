'use client'   // <---- IMPORTANTE

import { Form, Button, CreateIcon, DeleteIcon, Modal, UpdateIcon, ViewIcon } from "@/components/simpleui";
import { createEmpleado, deleteEmpleado, updateEmpleado } from "@/lib/actions/empleados";





const fields = (data) => [
    {
        name: "nombre",
        label: "Nombre",
        component: "InputText"
    },
    {
        name: "empresa",
        label: "Empresa",
        component: "InputText"
    },

    {
        name: "cargo",
        label: "Cargo",
        component: "InputText"
    },
    {
        name: "nivel",
        label: "Nivel",
        component: "InputSelect",
        options: [
            // [label, value, checked]
            ["Amateur", "amateur", data?.nivel == 'amateur'],
            ["Junior", "junior", data?.nivel == 'junior'],
            ["Senior", "senior", data?.nivel == 'senior'],
            ["Veterano", "veterano", data?.nivel == 'veterano']
        ]
    },
    {
        name: "aficiones",
        label: "Aficiones",
        component: "InputSelect",
        multiple: true,
        options: [
            // [label, value, checked]
            ["Lectura", "leer", data?.aficiones?.includes("leer")],
            ["Cine", "cine", data?.aficiones?.includes("cine")],
            ["Música", "musica", data?.aficiones?.includes("musica")],
            ["Playa", "playa", data?.aficiones?.includes("playa")],
            ["Deporte", "deporte", data?.aficiones?.includes("deporte")],
            ["Baile", "baile", data?.aficiones?.includes("baile")],
            ["Pintura", "pintura", data?.aficiones?.includes("pintura")],
        ],
    },
]





const FormEmpleado = ({ data = {}, action, disabled }) => {

    const submit = () => {
        switch (action) {
            case createEmpleado: return {
                color: "green",
                component: "Submit",
                labels: ["Registrar empleado", "Registrando empleado ..."],
            }

            case updateEmpleado: return {
                color: "orange",
                component: "Submit",
                labels: ["Modificar empleado", "Modificando empleado ..."],
            }

            case deleteEmpleado: return {
                color: "red",
                component: "Submit",
                labels: ["Eliminar empleado", "Eliminando empleado ..."]
            }
            default:
                return null
        }
    }

    const submitField = submit();

    return (
        <Form
            data={data}
            action={action}
            disabled={disabled}
            fields={[
                ...fields(data),
                ...(submitField ? [submitField] : [])
            ]}
        />
    )
}



const CreateButton = () => (
    <Button color="green">
        <CreateIcon className={"size-4 md:size-6"} />
    </Button>
)


const UpdateButton = () => (
    <Button color="amber">
        <UpdateIcon className={"size-4 md:size-6"} />
    </Button>
)

const DeleteButton = () => (
    <Button color="red">
        <DeleteIcon className={"size-4 md:size-6"} />
    </Button>
)


const ViewButton = () => (
    <Button color="blue">
        <ViewIcon className={"size-4 md:size-6"} />
    </Button>
)



export const CreateEmpleado = ({ data = {} }) => (
    <Modal trigger={<CreateButton />} className="my-1">
        <h2 className="text-xl font-bold mb-4 text-green-400">Nuevo Empleado</h2>

        <FormEmpleado data={data} action={createEmpleado} />
    </Modal>
)


export const UpdateEmpleado = ({ data = {} }) => (
    <Modal trigger={<UpdateButton />}>
        <h2 className="text-xl font-bold mb-4 text-amber-400">Modificar Empleado</h2>

        <FormEmpleado data={data} action={updateEmpleado} />
    </Modal>
)




export const DeleteEmpleado = ({ data = {} }) => (
    <Modal trigger={<DeleteButton />}>
        <h2 className="text-xl font-bold mb-4 text-red-400">Eliminar Empleado</h2>

        <FormEmpleado data={data} action={deleteEmpleado} disabled />
    </Modal>
)


export const ViewEmpleado = ({ data = {} }) => (
    <Modal trigger={<ViewButton />}>
        <h2 className="text-xl font-bold mb-4 text-blue-400">Ver Empleado</h2>

        <FormEmpleado data={data} action={async () => ({ type: "success" })} disabled />
    </Modal>
)