export const parseConverter = (converter) => {
    const [
        from,
        ,
        to,
        filename,
    ] = converter;
    
    if (!to.endsWith(':'))
        return [from, to];
    
    return [from, to.slice(0, -1), filename];
};
