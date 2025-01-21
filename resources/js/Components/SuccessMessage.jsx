import React from "react";

const SuccessMessage = ({ message }) => {
    return (
        <div className="inset-x-0 z-50 flex items-center justify-center h-12 mb-5 text-sm font-bold text-green-600 bg-green-100 rounded-lg shadow-md ">
            {message}
        </div>
    );
};

export default SuccessMessage;
