//your code here



class OutOfRangeError extends Error {
  constructor(arg) {
    const message = `Expression should only consist of integers and +-/* characters and not ${arg}`;
    super(message);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    const message = 'Expression should not have an invalid combination of expression';
    super(message);
    this.name = this.constructor.name;
  }
}

function evalString(expression) {
  try {
    if (/^\s*$/.test(expression)) {
      return 0;
    }
    if (/^[\/*+].*/.test(expression)) {
      throw new SyntaxError('Expression should not start with invalid operator');
    }
    if (/.*[\/*+-]$/.test(expression)) {
      throw new SyntaxError('Expression should not end with invalid operator');
    }
    if (/[+]{2}|[-]{2}|[*]{2}|[/]{2}|[+][*]|[+][/]|[-][*]|[-][/]/.test(expression)) {
      throw new InvalidExprError();
    }
    const result = eval(expression);
    if (typeof result !== 'number' || !Number.isFinite(result)) {
      throw new OutOfRangeError(result);
    }
    return result;
  } catch (err) {
    console.error(`${err.name}: ${err.message}`);
    return undefined;
  }
}
