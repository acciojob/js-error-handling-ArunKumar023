class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of expression');
    this.name = this.constructor.name;
  }
}

function evalString(expr) {
  if (/[\+\-\*\/]{2,}/.test(expr)) {
    throw new InvalidExprError();
  }

  if (/^[\+\*\/]/.test(expr)) {
    throw new SyntaxError('Expression should not start with invalid operator');
  }

  if (/[\+\*\/\-]$/.test(expr)) {
    throw new SyntaxError('Expression should not end with invalid operator');
  }

  if (/[^0-9+\-*/\s]/.test(expr)) {
    throw new OutOfRangeError(expr.match(/[^0-9+\-*/\s]/)[0]);
  }

  return eval(expr);
}

try {
  const result = evalString('1 + 2 * 3');
  console.log(result); // 7
} catch (e) {
  console.error(e);
}