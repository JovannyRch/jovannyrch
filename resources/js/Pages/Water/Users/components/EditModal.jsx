import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Box, Flex, Select, Button } from "@radix-ui/themes";
import React, { useEffect } from "react";

const EditModal = ({ user, isOpen, onClose, groups }) => {
    const { data, setData, errors, put } = useForm({
        name: "",
        number: "",
        group: "",
    });

    useEffect(() => {
        if (user) {
            setData("name", user.name);
            setData("number", user.number);
            setData("group_id", user.group_id);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("water-users.update", user.id), {
            onSuccess: () => {
                onClose();
            },
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
                            Editar usuario
                        </h2>
                    </div>
                    <Box className="pt-2">
                        <InputLabel htmlFor="number" value="Número" />

                        <TextInput
                            id="number"
                            type="text"
                            name="number"
                            value={data.number}
                            className="block w-full mt-1"
                            onChange={(e) => setData("number", e.target.value)}
                            required
                        />

                        <InputError message={errors.number} className="mt-2" />
                    </Box>

                    <Box className="pt-2">
                        <InputLabel htmlFor="name" value="Nombre" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </Box>

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

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            className="p-2 text-white bg-blue-500 rounded-md min-w-20"
                            type="submit"
                            color="blue"
                        >
                            Guardar cambios
                        </button>
                        <button
                            className="p-2 text-white bg-red-500 rounded-md min-w-20"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </Flex>
            </form>
        </Modal>
    );
};

export default EditModal;
