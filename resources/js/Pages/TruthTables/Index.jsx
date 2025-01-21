import Pagination from "@/Components/Pagintation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table } from "@radix-ui/themes";
import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function Index({ expressions }) {
    const { data } = expressions;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tablas de Verdad
                </h2>
            }
        >
            <Head title="Tablas de Verdad" />
            <div className="flex justify-end">
                <a
                    href={route("truth-tables.create")}
                    className="flex items-center gap-1 px-4 py-2 text-white bg-blue-500 rounded-md"
                >
                    <IoMdAdd />
                    Crear expresión
                </a>
            </div>
            <div>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>
                                Expresión
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Contador
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Video link
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((expression) => (
                            <Table.Row key={expression.id}>
                                <Table.Cell>{expression.expression}</Table.Cell>
                                <Table.Cell>{expression.counter}</Table.Cell>
                                <Table.Cell>
                                    {expression.video_link ?? "-"}
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
