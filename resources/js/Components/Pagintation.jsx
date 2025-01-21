import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ pagination }) => {
    const { links, current_page } = pagination;

    if (links.length <= 1) {
        return null;
    }

    return (
        <nav className="flex items-center justify-center mt-6">
            <ul className="flex space-x-1">
                {links.map((link, index) => {
                    const isActive = link.active;
                    const isDisabled = link.url === null;

                    return (
                        <li key={index}>
                            {isDisabled ? (
                                <span
                                    className={`px-3 py-1 border rounded text-gray-400 bg-gray-100 cursor-not-allowed select-none`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <Link
                                    href={link.url || "#"}
                                    className={`px-3 py-1 border rounded hover:bg-gray-200 transition-colors duration-200 ${
                                        isActive
                                            ? "bg-blue-700 text-white border-blue-700"
                                            : "bg-white text-gray-700 border-gray-300"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
