import { formatCurrency } from "@/utils/formatters";
import React from "react";

const AmountCard = ({ title, amount }) => {
    return (
        <div className="w-full px-4 py-2 mt-4 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-semibold text-center text-gray-800">
                {title}
            </h1>
            <p className="text-2xl font-semibold text-center text-gray-800">
                {formatCurrency(amount)}
            </p>
        </div>
    );
};

export default AmountCard;
