//your code here

class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super(`Expression should not have an invalid combination of expression`);
    this.name = this.constructor.name;
  }
}

function evalString(str) {
  const invalidOperators = /[\+\-\*\/]{2}/g;
  const invalidStart = /^[\+\*\/]/;
  const invalidEnd = /[\+\*\/\-]$/;

  if (invalidOperators.test(str)) {
    throw new InvalidExprError();
  }

  if (invalidStart.test(str)) {
    throw new SyntaxError(`Expression should not start with invalid operator`);
  }

  if (invalidEnd.test(str)) {
    throw new SyntaxError(`Expression should not end with invalid operator`);
  }

  const validChars = /^[0-9\+\-\*\/\s]+$/;
  if (!validChars.test(str)) {
    throw new OutOfRangeError(str);
  }

  // do evaluation here
  // ...
}

try {
  evalString("1 + 2 * 3");
} catch (err) {
  if (err instanceof OutOfRangeError || err instanceof InvalidExprError) {
    console.error(err.message);
  } else {
    throw err;
  }
}

