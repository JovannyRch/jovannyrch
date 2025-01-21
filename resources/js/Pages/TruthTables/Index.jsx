import Pagination from "@/Components/Pagintation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { IconButton, Table } from "@radix-ui/themes";
import React from "react";
import ExpressionFormDialog from "./components/ExpressionFormDialog";
import ErrorMessage from "@/Components/ErrorMessage";
import SuccessMessage from "@/Components/SuccessMessage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EditExpressionFormDialog from "./components/EditExpressionFormDialog";

export default function Index({ expressions, flash }) {
    const { data } = expressions;

    const { error, success } = flash;
    const { delete: deleteFun, setData } = useForm({
        id: "",
    });

    const handleOnDelete = (id) => {
        deleteFun(route("truth-tables.destroy", id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tablas de Verdad
                </h2>
            }
        >
            <Head title="Tablas de Verdad" />
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            <div className="flex justify-between mb-6">
                {/*  <TextField.Root placeholder="Search the docs…">
                    <TextField.Slot>
                        <FaMagnifyingGlass className="w-3 h-3" />
                    </TextField.Slot>
                </TextField.Root> */}
                <div />
                <ExpressionFormDialog />
            </div>
            <div>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>
                                Expresión
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Tipo
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Contador
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Video link
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((expression) => (
                            <Table.Row key={expression.id}>
                                <Table.Cell>{expression.expression}</Table.Cell>
                                <Table.Cell>{expression.type}</Table.Cell>
                                <Table.Cell>{expression.counter}</Table.Cell>
                                <Table.Cell>
                                    {expression.video_link ?? "-"}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-1">
                                        <EditExpressionFormDialog
                                            expression={expression}
                                        />
                                        <IconButton
                                            color="red"
                                            type="button"
                                            onClick={() => {
                                                setData("id", expression.id);
                                                if (
                                                    confirm(
                                                        "¿Estás seguro de eliminar esta expresión?"
                                                    )
                                                ) {
                                                    handleOnDelete(
                                                        expression.id
                                                    );
                                                }
                                            }}
                                        >
                                            <MdOutlineDeleteOutline />
                                        </IconButton>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <Pagination pagination={expressions} />
            </div>
        </AuthenticatedLayout>
    );
}
