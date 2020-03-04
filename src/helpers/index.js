export const errorWrap = (handler) => (...args) => {
  handler(...args).catch(args[args.length - 1]);
};

export const assert = (statement, errorType, ...errorArgs) => {
  if (!statement) {
    throw errorType(...errorArgs);
  }
};
