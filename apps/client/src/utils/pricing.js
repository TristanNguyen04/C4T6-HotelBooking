export const calculateRoomPrice = (room, options) => {
    const { nights, showExcludedFees = true } = options;
    const baseRateTotal = room.base_rate_in_currency;
    // const baseRatePerNight = baseRateTotal / nights;
    const includedFeesTotal = room.included_taxes_and_fees_total_in_currency;
    // const includedFeesPerNight = includedFeesTotal / nights;
    const excludedFeesTotal = room.excluded_taxes_and_fees_total_in_currency;
    // const excludedFeesPerNight = excludedFeesTotal / nights;
    const subtotal = baseRateTotal + includedFeesTotal;
    const totalPrice = showExcludedFees ? subtotal + excludedFeesTotal : subtotal;
    return {
        base_rate_in_currency: baseRateTotal,
        included_taxes_and_fees_total_in_currency: includedFeesTotal,
        excluded_taxes_and_fees_total_in_currency: excludedFeesTotal,
        total_price: totalPrice,
        currency: 'SGD',
        nights: nights,
    };
};
export const formatPrice = (amount, currency = 'SGD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
