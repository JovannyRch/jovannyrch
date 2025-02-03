import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Box, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";

const UploadUsersModal = ({ isOpen, onClose, groups }) => {
    const [csvFile, setCsvFile] = useState(null);
    const { data, setData } = useForm({
        group_id: groups?.[0]?.id ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!csvFile) return;

        const formData = new FormData();
        formData.append("csv_file", csvFile);
        formData.append("group_id", data.group_id);

        axios
            .post("/water/users/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                onClose();
                route.reload();
            })
            .catch((error) => {
                console.error("Error al procesar el archivo:", error);
            });
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <Flex
                    direction="column"
                    gap="3"
                    gapY={3}
                    justify={"center"}
                    className="p-4"
                >
                    <div className="flex justify-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Subir usuarios
                        </h2>
                    </div>

                    <Box className="pt-2">
                        <InputLabel htmlFor="group" value="Grupo" />
                        <select
                            className="px-2 py-1 pr-8 border border-gray-300 rounded-lg"
                            value={data.group_id}
                            defaultValue={groups?.[0]?.id ?? ""}
                            onChange={(e) => {
                                setData("group_id", e.target.value);
                            }}
                        >
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </Box>

                    <Box className="pt-2">
                        <div className="flex items-center justify-center">
                            <label className="flex flex-col items-center w-full px-4 py-6 tracking-wide text-blue-500 uppercase transition duration-300 ease-in-out bg-white border border-blue-500 rounded-lg shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white">
                                <svg
                                    className="w-8 h-8"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M16.88 9.94a1.5 1.5 0 00-2.12 0l-2.17 2.17V3.5a1.5 1.5 0 00-3 0v8.61l-2.17-2.17a1.5 1.5 0 10-2.12 2.12l5 5a1.5 1.5 0 002.12 0l5-5a1.5 1.5 0 000-2.12z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">
                                    Selecciona un archivo
                                </span>
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={(e) => {
                                        setCsvFile(e.target.files?.[0] || null);
                                    }}
                                    required
                                />
                            </label>
                        </div>
                    </Box>
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            className="p-2 text-white bg-red-500 rounded-md min-w-20"
                            type="submit"
                        >
                            Subir
                        </button>
                        <button
                            variant="secondary"
                            onClick={onClose}
                            className="p-2 text-white bg-blue-500 rounded-md min-w-20"
                        >
                            Cancelar
                        </button>
                    </div>
                </Flex>
            </form>
        </Modal>
    );
};

export default UploadUsersModal;
