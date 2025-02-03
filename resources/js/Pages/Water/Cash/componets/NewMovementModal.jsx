import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { MovementType } from "../types";
import InputLabel from "@/Components/InputLabel";

import { FaDollarSign, FaMoneyBill } from "react-icons/fa";
import InputError from "@/Components/InputError";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const NewMovementModal = ({ isOpen, onClose, type, item, setItem }) => {
    const { data, errors, setData, post, reset, put } = useForm({
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        type: type,
    });

    const isEditMode = item ? true : false;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            put(route("cash.update", item.id), {
                onSuccess: () => {
                    onClose();
                    reset();
                    setData("type", type);
                    setData("date", new Date().toISOString().split("T")[0]);
                    setItem(null);
                },
            });
        } else {
            post(route("cash.store"), {
                onSuccess: () => {
                    onClose();
                    reset();
                    setData("type", type);
                    setData("date", new Date().toISOString().split("T")[0]);
                },
            });
        }
    };

    useEffect(() => {
        setData("type", type);
    }, [type]);

    useEffect(() => {
        if (isEditMode) {
            const formattedDate = new Date(item.date)
                .toISOString()
                .split("T")[0];
            setData("amount", item.amount);
            setData("description", item.description);
            setData("date", formattedDate);
        }
    }, [item, isEditMode]);

    const actionTitle = item ? "Editar" : "Nuevo";
    const buttonTitle = item ? "Editar" : "Guardar";

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-4">
                <h2 className="flex gap-1 text-xl font-semibold leading-tight text-gray-800">
                    {actionTitle}{" "}
                    {type === MovementType.income ? "ingreso" : "egreso"}
                    {type === MovementType.income ? (
                        <CiCirclePlus className="w-6 h-6 text-green-500" />
                    ) : (
                        <CiCircleMinus className="w-6 h-6 text-red-500" />
                    )}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Text area for descrription */}
                    <div className="pt-2">
                        <InputLabel htmlFor="description" value="Concepto" />
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo"
                        />
                    </div>
                    {/* Input for amount */}
                    <div className="pt-2">
                        <InputLabel htmlFor="amount" value="Monto" />
                        <div className="flex items-center max-w-sm ">
                            <FaDollarSign />
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo"
                            />
                            {/*      <InputError message={errors.amount} /> */}
                        </div>
                    </div>

                    <div className="pt-2">
                        <InputLabel htmlFor="date" value="Fecha" />
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                            className="block w-full max-w-sm mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo"
                        />
                        <InputError message={errors.date} />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
                        >
                            {buttonTitle}
                        </button>

                        <button
                            onClick={onClose}
                            className="px-4 py-2 ml-2 text-white bg-red-600 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default NewMovementModal;
