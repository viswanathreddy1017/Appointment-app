export const catchAsyncErrors = (theFunctionn) => {
    return (req, res, next) => {
        Promise.resolve(theFunctionn(req, res, next)).catch(next);
    };
};