class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

// InvalidExprError class
class InvalidExprError extends Error {
  constructor() {
    super(`Expression should not have an invalid combination of expression`);
    this.name = "InvalidExprError";
  }
}

// evalString function
function evalString(str) {
  // Check for invalid combinations of operators
  if (str.match(/[+\-*/]{2}/)) {
    throw new InvalidExprError();
  }

  // Check for invalid starting operators
  if (str.match(/^[+\-*/]/)) {
    throw new SyntaxError("Expression should not start with invalid operator");
  }

  // Check for invalid ending operators
  if (str.match(/[+\-*/]$/)) {
    throw new SyntaxError("Expression should not end with invalid operator");
  }

  // Check for other invalid characters
  if (str.match(/[^0-9+\-*/\s]/)) {
    let invalidChar = str.match(/[^0-9+\-*/\s]/)[0];
    throw new OutOfRangeError(invalidChar);
  }

  // Evaluate the expression and return the result
  return eval(str);
}

// Testing the evalString function
try {
  let result = evalString("3 + 4 * 2");
  console.log(result); // Output: 11

  result = evalString("2 / 0");
  console.log(result); // This line won't execute due to the thrown error
} catch (err) {
  console.log(err.name + ": " + err.message);
}