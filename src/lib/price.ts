const huf = new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF", maximumFractionDigits: 0 });

// "190 000 Ft", with non-breaking spaces so a price never wraps.
export const formatPrice = (forints: number) => huf.format(forints);
