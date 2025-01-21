import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Button, Flex, Select, TextArea } from "@radix-ui/themes";
import React from "react";

const Create = (props) => {
    const { data, setData, errors, post } = useForm({
        expression: "",
        type: "CONTINGENCY",
        video_link: "",
        description: "",
    });

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log("data", data);
        post(route("truth-tables.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Crear expresión
                </h2>
            }
        >
            <Head title="Crear expressión" />
            <div className="flex justify-center">
                <Flex
                    direction="column"
                    gap="3"
                    justify={"center"}
                    maxWidth={"250px"}
                >
                    <Box maxWidth="250px">
                        <InputLabel htmlFor="expression" value="Expresión" />

                        <TextInput
                            id="expression"
                            type="text"
                            name="expression"
                            value={data.expression}
                            className="block w-full mt-1"
                            onChange={(e) =>
                                setData("expression", e.target.value)
                            }
                            onChan
                            required
                        />

                        <InputError
                            message={errors.expression}
                            className="mt-2"
                        />
                    </Box>
                    <Box maxWidth="250px">
                        <InputLabel htmlFor="expression" value="Tipo" />

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

                        <InputError message={errors.type} className="mt-2" />
                    </Box>
                    <Box maxWidth="250px">
                        <InputLabel
                            htmlFor="video_link"
                            value="Link del video"
                        />

                        <TextArea
                            id="video_link"
                            type="text"
                            name="video_link"
                            value={data.video_link}
                            className="block w-full mt-1"
                            onChange={(e) =>
                                setData("video_link", e.target.value)
                            }
                            onChan
                            required
                        />

                        <InputError
                            message={errors.video_link}
                            className="mt-2"
                        />
                    </Box>

                    <Box maxWidth="250px">
                        <InputLabel htmlFor="description" value="Descripción" />

                        <TextArea
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="block w-full mt-1"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            onChan
                            required
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </Box>

                    <div className="flex justify-end w-100">
                        <Button type="submit" onClick={handleSumbit}>
                            Crear
                        </Button>
                    </div>
                </Flex>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
