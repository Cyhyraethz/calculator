// To do: remove insignificant trailing zeros from total
// To do: add some keyboard functionality calculator

const history = document.getElementById('history');
const total = document.getElementById('total');

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
  let joinedTotal =
    Math.round((parseFloat(splitTotal.join('')) + Number.EPSILON) * 10000) /
    10000;
  let recent = document.createElement('p');
  recent.innerHTML = oldTotal + ' = ' + joinedTotal;
  if (history.firstChild) {
    history.insertBefore(recent, history.firstChild);
  } else {
    history.appendChild(recent);
  }
  total.innerHTML = joinedTotal;
};

const operate = (operator, num1, num2) => {
  if (operator[0] === '+') {
    return parseFloat(num1) + parseFloat(num2);
  } else if (operator[0] === '-') {
    return parseFloat(num1) - parseFloat(num2);
  } else if (operator[0] === '*') {
    return parseFloat(num1) * parseFloat(num2);
  } else if (operator[0] === '/') {
    return parseFloat(num1) / parseFloat(num2);
  }
};

const num = num => {
  let splitTotal = total.innerHTML.split(' ');
  if (
    splitTotal[splitTotal.length - 1][0] === '0' &&
    splitTotal[splitTotal.length - 1].indexOf('.') < 0 &&
    splitTotal[splitTotal.length - 1].indexOf(' ') < 0
  ) {
    splitTotal[splitTotal.length - 1] = num;
    total.innerHTML = splitTotal.join(' ');
  } else {
    total.innerHTML += num;
  }
};

const symbol = symbol => {
  let currentNum = total.innerHTML.split(' ')[
    total.innerHTML.split(' ').length - 1
  ];
  if (!isNaN(parseFloat(currentNum))) {
    if (currentNum[currentNum.length - 1] === '.') {
      backspaceTotal();
    }
    total.innerHTML += ` ${symbol} `;
  }
};

const decimal = () => {
  let currentNum = total.innerHTML.split(' ')[
    total.innerHTML.split(' ').length - 1
  ];
  if (currentNum.indexOf('.') < 0) {
    if (currentNum.length < 1) {
      total.innerHTML += '0.';
    } else {
      total.innerHTML += '.';
    }
  }
};

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
