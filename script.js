// Warning: Executing Javascript from a string is an enormous security risk. It is far too easy for a bad actor to run arbitrary code when eval() is used. Never use eval()!

// Declare basic functions
const add = (num1, num2) => {
  return num1 + num2;
};
const subtract = (num1, num2) => {
  return num1 - num2;
};
const multiply = (num1, num2) => {
  return num1 * num2;
};
const divide = (num1, num2) => {
  return num1 / num2;
};

// Test basic functions
// console.log('2 + 2 = ' + add(2, 2));
// console.log('2 - 2 = ' + subtract(2, 2));
// console.log('2 * 2 = ' + multiply(2, 2));
// console.log('2 / 2 = ' + divide(2, 2));

// Declare complex functions
const operate = (operator, num1, num2) => {
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === '*') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    return divide(num1, num2);
  } else {
    alert('Please enter a valid operator. Valid operators include: + - * /');
  }
};

// Test complex functions
// console.log('2 + 2 = ' + operate('+', 2, 2));
// console.log('2 - 2 = ' + operate('-', 2, 2));
// console.log('2 * 2 = ' + operate('*', 2, 2));
// console.log('2 / 2 = ' + operate('/', 2, 2));

// Declare number functions
const zero = () => {
  return 0;
};
const one = () => {
  return 1;
};
const two = () => {
  return 2;
};
const three = () => {
  return 3;
};
const four = () => {
  return 4;
};
const five = () => {
  return 5;
};
const six = () => {
  return 6;
};
const seven = () => {
  return 7;
};
const eight = () => {
  return 8;
};
const nine = () => {
  return 9;
};
