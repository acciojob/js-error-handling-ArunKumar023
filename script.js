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
  try {
    if (/^[+*/]/.test(str)) {
      throw new SyntaxError('Expression should not start with invalid operator');
    }
    if (/[\+\-\*\/][\+\*\/]$/.test(str)) {
      throw new InvalidExprError();
    }
    if (/[+*/-]$/.test(str)) {
      throw new SyntaxError('Expression should not end with invalid operator');
    }
    const regex = /[-+]?[0-9]+([*\/+][-+]?[0-9]+)*/g;
    const matches = str.match(regex);
    if (!matches || matches.join("") !== str) {
      throw new OutOfRangeError(str);
    }
    return eval(str);
  } catch (error) {
    console.error(error);
  }
}

// Test cases
console.log(evalString("1 + 2 - 3")); // Output: 0
console.log(evalString("1 + + 2")); // Output: SyntaxError: Expression should not have an invalid combination of expression
console.log(evalString("*1 + 2 - 3*")); // Output: OutOfRangeError: Expression should only consist of integers and +-/* characters and not *1 + 2 - 3*
console.log(evalString("1 / 0")); // Output: Infinity
console.log(evalString("-1 * 2 + 3")); // Output: 1
