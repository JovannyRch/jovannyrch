import Pagination from "@/Components/Pagintation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import EditModal from "./components/EditModal";
import UploadUsersModal from "./components/UploadUsersModal";
import { MdAdd, MdDelete, MdFileDownload, MdFileUpload } from "react-icons/md";
import axios from "axios";

const Users = ({ pagination, groups }) => {
    const { data } = pagination;
    const [showUserForm, setShowUserForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUploadUsersModal, setIsUploadUsersModal] = useState(false);

    const form = useForm({
        name: "",
        number: "",
        group_id: groups?.[0]?.id ?? "",
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        form.post(route("water-users.store"), {
            onSuccess: () => {
                form.setData("name", "");
                form.setData("number", getHighestGroupNumber() + 1);
            },
            preserveScroll: true,
        });
    };

    const handleOnDelete = (id) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            form.delete(route("water-users.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const handleOnDeleteAll = async (e) => {
        e.preventDefault();
        if (confirm("¿Estás seguro de eliminar todos los usuarios?")) {
            await axios.delete("/water/users/destroy-all");
            route.reload();
        }
    };

    const getHighestGroupNumber = () => {
        let highest = 0;
        data.forEach((item) => {
            if (item.group_id === form.data.group_id) {
                const number = parseInt(item.number);
                if (number > highest) {
                    highest = number;
                }
            }
        });
        return highest;
    };

    useEffect(() => {
        form.setData("number", String(getHighestGroupNumber() + 1));
    }, [groups]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Usuarios del agua
                </h2>
            }
        >
            <Head title="Usuarios del agua" />
            <div className="flex mb-6">
                {showUserForm ? (
                    <div className="flex justify-end w-full gap-2">
                        {/* Inline form */}
                        <form className="flex gap-2" onSubmit={handleOnSubmit}>
                            <input
                                type="text"
                                placeholder="Número"
                                className="w-20 px-2 py-1 border border-gray-300 rounded-lg"
                                value={form.data.number}
                                onChange={(e) => {
                                    form.setData("number", e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="px-2 py-1 border border-gray-300 rounded-lg w-60"
                                value={form.data.name}
                                onChange={(e) => {
                                    form.setData(
                                        "name",
                                        String(e.target.value)
                                    );
                                }}
                            />
                            <select
                                className="px-2 py-1 pr-8 border border-gray-300 rounded-lg"
                                value={form.data.group_id}
                                defaultValue={groups?.[0]?.id ?? ""}
                                onChange={(e) => {
                                    form.setData("group_id", e.target.value);
                                }}
                            >
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>

                            <Button
                                className="text-white bg-blue-500"
                                type="submit"
                            >
                                Agregar
                            </Button>
                        </form>
                        <Button onClick={() => setShowUserForm(false)}>
                            Cerrar
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-end w-full gap-2">
                        <Button onClick={() => setShowUserForm(true)}>
                            <MdAdd className="w-5 h-5" />
                            Agregar usuario
                        </Button>
                        <Button
                            color="grass"
                            onClick={() => setIsUploadUsersModal(true)}
                        >
                            <MdFileUpload className="w-5 h-5" />
                            Subir archivo
                        </Button>

                        <Button color="red" onClick={handleOnDeleteAll}>
                            <MdDelete className="w-5 h-5" />
                            Eliminar todos
                        </Button>
                        <a
                            color="cyan"
                            href="/water/users/export"
                            target="_blank"
                            className="flex items-center gap-1 px-2 py-1 text-sm text-white rounded-md bg-cyan-500"
                        >
                            <MdFileDownload className="w-5 h-5" />
                            Descargar listado
                        </a>
                    </div>
                )}
            </div>

            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Número</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Nombre</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Grupo</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                            Acciones
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.number}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.group.name}</Table.Cell>
                            <Table.Cell>
                                <div className="flex gap-1">
                                    <Button
                                        color="yellow"
                                        onClick={() => {
                                            setSelectedUser(item);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        color="red"
                                        onClick={() => handleOnDelete(item.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </Table.Cell>

                            {/* <Table.Cell>
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
                                </Table.Cell> */}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination pagination={pagination} />

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={selectedUser}
                groups={groups}
            />
            <UploadUsersModal
                isOpen={isUploadUsersModal}
                onClose={() => setIsUploadUsersModal(false)}
                groups={groups}
            />
        </AuthenticatedLayout>
    );
};

export default Users;
