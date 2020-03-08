// Declare variables
const history = document.getElementById('history');
const total = document.getElementById('total');

// Declare basic functions
const add = (num1, num2) => {
  return parseInt(num1) + parseInt(num2);
};
const subtract = (num1, num2) => {
  return parseInt(num1) - parseInt(num2);
};
const multiply = (num1, num2) => {
  return parseInt(num1) * parseInt(num2);
};
const divide = (num1, num2) => {
  return parseInt(num1) / parseInt(num2);
};

// Declare complex functions
const operate = (operator, num1, num2) => {
  if (operator[0] === '+') {
    return add(num1, num2);
  } else if (operator[0] === '-') {
    return subtract(num1, num2);
  } else if (operator[0] === '*') {
    return multiply(num1, num2);
  } else if (operator[0] === '/') {
    return divide(num1, num2);
  } else {
    // alert('Please enter a valid operator. Valid operators include: + - * /');
  }
};
const equation = () => {
  let operator;
  let num1;
  let num2;
  let newTotal;
  let oldTotal = total.innerHTML;
  let splitTotal = total.innerHTML.split(' ');
  while (splitTotal.length > 1) {
    if (splitTotal.join(' ').search(/[*/]/) > -1) {
      let index = splitTotal.join('').indexOf(/[*/]/);
      num2 = splitTotal.splice(index, 1);
      operator = splitTotal.splice(index, 1);
      num1 = splitTotal.splice(index, 1, 'placeholder');
      newTotal = operate(operator, num1, num2);
      splitTotal.splice(
        splitTotal.indexOf('placeholder'),
        1,
        newTotal.toString()
      );
    } else {
      num1 = splitTotal.splice(0, 1);
      operator = splitTotal.splice(0, 1);
      num2 = splitTotal.splice(0, 1);
      newTotal = operate(operator, num1, num2);
      splitTotal.unshift(newTotal);
    }
  }
  let joinedTotal = splitTotal.join('');
  let recent = document.createElement('p');
  recent.innerHTML = oldTotal + ' = ' + joinedTotal;
  if (history.firstChild) {
    history.insertBefore(recent, history.firstChild);
  } else {
    history.appendChild(recent);
  }
  total.innerHTML = joinedTotal;
};

// Declare number functions
const zero = () => {
  if (
    total.innerHTML[0] !== '0' ||
    total.innerHTML.indexOf('.') > 0 ||
    total.innerHTML.indexOf(' ') > 0
  ) {
    total.innerHTML += '0';
  }
};
const one = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '1';
  } else {
    total.innerHTML += '1';
  }
};
const two = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '2';
  } else {
    total.innerHTML += '2';
  }
};
const three = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '3';
  } else {
    total.innerHTML += '3';
  }
};
const four = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '4';
  } else {
    total.innerHTML += '4';
  }
};
const five = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '5';
  } else {
    total.innerHTML += '5';
  }
};
const six = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '6';
  } else {
    total.innerHTML += '6';
  }
};
const seven = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '7';
  } else {
    total.innerHTML += '7';
  }
};
const eight = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '8';
  } else {
    total.innerHTML += '8';
  }
};
const nine = () => {
  if (
    total.innerHTML[0] === '0' &&
    total.innerHTML.indexOf('.') < 0 &&
    total.innerHTML.indexOf(' ') < 0
  ) {
    total.innerHTML = '9';
  } else {
    total.innerHTML += '9';
  }
};

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
const clearAll = () => {
  total.innerHTML = '';
  history.innerHTML = '';
};
const clearTotal = () => {
  total.innerHTML = '';
};
const backspaceTotal = () => {
  total.innerHTML = total.innerHTML.substring(0, total.innerHTML.length - 1);
};
