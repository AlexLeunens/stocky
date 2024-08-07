const getDividendAmount = (amount: number, dividend: number) => {
    return amount * dividend;
}

const getDividendAmountAfterTax = (dividendTotal: number) => {
    return dividendTotal * 0.55;
}

const getDividendText = (amount: number, dividend: number) => {
    const total = getDividendAmount(amount, dividend);
    const afterTaxes = getDividendAmountAfterTax(total);

    return `${total.toFixed(3)} (${afterTaxes?.toFixed(3)})`
}

export const StockUtils = {
    getDividendText,
};