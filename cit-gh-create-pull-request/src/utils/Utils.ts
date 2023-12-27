
export const stripStringSeparatedByCommas = (str: string): string[] => {
    if (!str) return [];
    return str.split(",").map((s) => s.trim());
};


