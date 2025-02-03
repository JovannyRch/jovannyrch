import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import AmountCard from "./componets/AmountCard";
import { Button, Table } from "@radix-ui/themes";
import Pagination from "@/Components/Pagintation";
import { FaPiggyBank } from "react-icons/fa";
import {
    MdMoney,
    MdOutlineSupervisedUserCircle,
    MdPayments,
} from "react-icons/md";
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";

import NewMovementModal from "./componets/NewMovementModal";
import { MovementType } from "./types";
import { formatCurrency, formatDate } from "@/utils/formatters";
import axios from "axios";

const CashPage = ({ pagination, total, expenses, incomes }) => {
    const { data } = pagination;

    const [isNewMoveModalOpen, setIsNewMoveModalOpen] = useState(false);
    const [movementType, setMovementType] = useState(MovementType.income);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleDestroyAll = async () => {
        if (confirm("¿Estás seguro de eliminar todos los movimientos?")) {
            axios.delete("/water/cash/destroy-all");
            window.location.reload();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pagos del agua
                </h2>
            }
        >
            <Head title="Pagos del agua" />

            <div className="flex justify-center">
                <div className="w-full max-w-xl"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <AmountCard title="Total en caja" amount={total} />
                <AmountCard title="Ingresos" amount={incomes} />
                <AmountCard title="Egresos" amount={expenses} />

                <div className="w-full px-4 py-2 mt-4 bg-white rounded-lg shadow-md">
                    <button
                        className="block w-full text-center text-blue-600 cursor-pointer"
                        onClick={() => {
                            setIsNewMoveModalOpen(true);
                            setMovementType(MovementType.income);
                        }}
                    >
                        <MdPayments className="w-6 h-6 mx-auto" />
                        Registrar pago
                    </button>
                </div>

                <div className="w-full px-4 py-2 mt-4 bg-white rounded-lg shadow-md">
                    <button
                        className="block w-full text-center text-blue-600 cursor-pointer"
                        onClick={() => {
                            setIsNewMoveModalOpen(true);
                            setMovementType(MovementType.income);
                        }}
                    >
                        <FaPiggyBank className="w-6 h-6 mx-auto" />
                        Registrar ingreso
                    </button>
                </div>
                <div className="w-full px-4 py-2 mt-4 bg-white rounded-lg shadow-md">
                    <button
                        className="block w-full text-center text-blue-600 cursor-pointer"
                        onClick={() => {
                            setIsNewMoveModalOpen(true);
                            setMovementType(MovementType.expense);
                        }}
                    >
                        <MdMoney className="w-6 h-6 mx-auto" />
                        Registrar egreso
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex justify-end w-full gap-2">
                    <Link
                        href={route("water-users.index")}
                        className="flex items-center h-8 gap-1 p-2 text-white bg-blue-500 rounded-sm"
                    >
                        <MdOutlineSupervisedUserCircle className="w-6 h-6 mx-auto" />
                        Lista de usuarios
                    </Link>
                    <Button color="red" onClick={handleDestroyAll}>
                        <CiTrash className="w-6 h-6" />
                        Eliminar todos los movimientos
                    </Button>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                    Movimientos en caja
                </h3>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>
                                Tipo
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Detalle
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Monto
                            </Table.ColumnHeaderCell>

                            <Table.ColumnHeaderCell>
                                Caja antes
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Caja después
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Fecha
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Acciones
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((item) => (
                            <Table.Row
                                key={item.id}
                                className={
                                    item.amount > 0
                                        ? "bg-green-50"
                                        : "bg-red-50"
                                }
                            >
                                <Table.Cell>
                                    {item.amount > 0 ? (
                                        <CiCirclePlus className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <CiCircleMinus className="w-6 h-6 text-red-500" />
                                    )}
                                </Table.Cell>
                                <Table.Cell>{item.description}</Table.Cell>
                                <Table.Cell>
                                    {formatCurrency(Math.abs(item.amount))}
                                </Table.Cell>

                                <Table.Cell>
                                    {formatCurrency(item.last_total_amount)}
                                </Table.Cell>
                                <Table.Cell>
                                    {formatCurrency(
                                        Number(item.last_total_amount) +
                                            Number(item.amount)
                                    )}
                                </Table.Cell>
                                <Table.Cell>{formatDate(item.date)}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        onClick={() => {
                                            setIsNewMoveModalOpen(true);
                                            setMovementType(
                                                item.amount > 0
                                                    ? MovementType.income
                                                    : MovementType.expense
                                            );
                                            setSelectedItem(item);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <Pagination pagination={pagination} />
            </div>

            <NewMovementModal
                isOpen={isNewMoveModalOpen}
                onClose={() => setIsNewMoveModalOpen(false)}
                type={movementType}
                item={selectedItem}
                setItem={setSelectedItem}
            />
        </AuthenticatedLayout>
    );
};

export default CashPage;
