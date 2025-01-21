import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";

const Create = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Crear expresión
                </h2>
            }
        >
            <Head title="Crear expressión" />
            <Flex direction="column" gap="3">
                <Box maxWidth="250px">
                    <InputLabel htmlFor="expresion" value="Expresión" />

                    <TextInput
                        id="expresion"
                        type="text"
                        name="expresion"
                        /*  value={data.email} */
                        className="block w-full mt-1"
                        /* onChange={(e) => setData("email", e.target.value)} */
                        required
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </Box>
            </Flex>
        </AuthenticatedLayout>
    );
};

export default Create;
