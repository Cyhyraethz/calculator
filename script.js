// Warning: Executing Javascript from a string is an enormous security risk. It is far too easy for a bad actor to run arbitrary code when eval() is used. Never use eval()!

// Declare variables
let history = document.getElementById('history');
let total = document.getElementById('total');
let num1;
let num2;
let operator;

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

/* // Test basic functions
console.log('2 + 2 = ' + add(2, 2));
console.log('2 - 2 = ' + subtract(2, 2));
console.log('2 * 2 = ' + multiply(2, 2));
console.log('2 / 2 = ' + divide(2, 2)); */

// Declare complex functions
const operate = (num1, operator, num2) => {
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
const equation = () => {
  console.log('Testing');
};

/* // Test complex functions
console.log('2 + 2 = ' + operate('+', 2, 2));
console.log('2 - 2 = ' + operate('-', 2, 2));
console.log('2 * 2 = ' + operate('*', 2, 2));
console.log('2 / 2 = ' + operate('/', 2, 2)); */

// Declare number functions
const zero = () => {
  if (total.innerHTML[0] !== '0' || total.innerHTML.indexOf('.') > 0) {
    total.innerHTML += '0';
  }
};
const one = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '1';
  } else {
    total.innerHTML += '1';
  }
};
const two = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '2';
  } else {
    total.innerHTML += '2';
  }
};
const three = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '3';
  } else {
    total.innerHTML += '3';
  }
};
const four = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '4';
  } else {
    total.innerHTML += '4';
  }
};
const five = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '5';
  } else {
    total.innerHTML += '5';
  }
};
const six = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '6';
  } else {
    total.innerHTML += '6';
  }
};
const seven = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '7';
  } else {
    total.innerHTML += '7';
  }
};
const eight = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '8';
  } else {
    total.innerHTML += '8';
  }
};
const nine = () => {
  if (total.innerHTML[0] === '0' && total.innerHTML.indexOf('.') < 0) {
    total.innerHTML = '9';
  } else {
    total.innerHTML += '9';
  }
};

/* // Test number functions
console.log('0 = ' + zero());
console.log('1 = ' + one());
console.log('2 = ' + two());
console.log('3 = ' + three());
console.log('4 = ' + four());
console.log('5 = ' + five());
console.log('6 = ' + six());
console.log('7 = ' + seven());
console.log('8 = ' + eight());
console.log('9 = ' + nine()); */

//Declare symbol functions
const decimal = () => {
  if (total.innerHTML.indexOf('.') < 0) {
    if (total.innerHTML.length < 1) {
      total.innerHTML += '0.';
    } else {
      total.innerHTML += '.';
    }
  }
};
const addition = () => {
  if (!isNaN(parseInt(total.innerHTML[total.innerHTML.length - 1]))) {
    total.innerHTML += ' + ';
  }
};
const subtraction = () => {
  if (!isNaN(parseInt(total.innerHTML[total.innerHTML.length - 1]))) {
    total.innerHTML += ' - ';
  }
};
const multiplication = () => {
  if (!isNaN(parseInt(total.innerHTML[total.innerHTML.length - 1]))) {
    total.innerHTML += ' * ';
  }
};
const division = () => {
  if (!isNaN(parseInt(total.innerHTML[total.innerHTML.length - 1]))) {
    total.innerHTML += ' / ';
  }
};

// Declare top row functions
const clearTotal = () => {
  total.innerHTML = '';
};
const backspaceTotal = () => {
  total.innerHTML = total.innerHTML.substring(0, total.innerHTML.length - 1);
};
