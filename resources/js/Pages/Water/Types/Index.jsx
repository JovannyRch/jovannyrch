import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Index = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pagos del agua
                </h2>
            }
        >
            <Head title="Pagos del agua" />
        </AuthenticatedLayout>
    );
};

export default Index;
