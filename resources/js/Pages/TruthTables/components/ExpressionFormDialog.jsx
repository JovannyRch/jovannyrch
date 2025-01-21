import React, { useEffect, useRef } from "react";
import {
    Button,
    Dialog,
    Flex,
    Select,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { IoIosAdd } from "react-icons/io";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

const ExpressionFormDialog = () => {
    const { data, setData, errors, post } = useForm({
        expression: "",
        type: "CONTINGENCY",
        video_link: "",
        description: "",
    });

    const handleSubmit = (e) => {
        post(route("truth-tables.store"));
    };

    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>
                        <IoIosAdd className="w-6 h-6" />
                        Agregar expresión
                    </Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Agregar expresión</Dialog.Title>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Expresión
                            </Text>
                            <TextField.Root
                                placeholder="Ingrese la expresión lógica"
                                value={data.expression}
                                onChange={(e) =>
                                    setData("expression", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.expression}
                                className="mt-2"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Tipo
                            </Text>
                            <Select.Root
                                defaultValue="CONTINGENCY"
                                onValueChange={(e) => setData("type", e)}
                            >
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Label>Tipo</Select.Label>
                                        <Select.Item value="TAUTOLOGY">
                                            Tautología
                                        </Select.Item>
                                        <Select.Item value="CONTRADICTION">
                                            Contradicción
                                        </Select.Item>
                                        <Select.Item value="CONTINGENCY">
                                            Contingencia
                                        </Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                            <InputError
                                message={errors.type}
                                className="mt-2"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Link del video
                            </Text>
                            <TextField.Root
                                placeholder="Ingrese el link del video"
                                value={data.video_link}
                                onChange={(e) =>
                                    setData("video_link", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.video_link}
                                className="mt-2"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Descripción
                            </Text>
                            <TextArea
                                placeholder="Ingrese la descripción"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancelar
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button variant="soft" onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};

export default ExpressionFormDialog;
