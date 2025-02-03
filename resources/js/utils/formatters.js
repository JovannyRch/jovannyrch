//format currency
export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const formatCurrency = (value) => currencyFormatter.format(value);

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-MX");
};
