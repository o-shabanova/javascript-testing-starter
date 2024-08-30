// Lesson: Writing your first tests
export function max(a, b) {
  return (a > b) ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return n.toString();
}

//findFactorial function implementation

export function findFactorial(n) {
  //base case
  if (n === 0 || n === 1)
  return 1;

  //negative number or non-integer number
  if (n < 0 || !Number.isInteger(n)) {
    return undefined;
  }

  //recursive case
  return n * findFactorial(n - 1);
}