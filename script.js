// To do: add animation effect to buttons on key press

const history = document.getElementById('history');
const total = document.getElementById('total');

const equation = () => {
  if (!document.getElementById('temporary')) {
    if (!total.innerHTML) {
      return;
    } else {
      if (total.innerHTML[total.innerHTML.length - 1].search(/\d/) < 0) {
        backspaceTotal(3);
      }
      let oldTotal = total.innerHTML;
      let splitTotal = total.innerHTML.split(' ');
      if (
        splitTotal.indexOf('/') > -1 &&
        splitTotal[splitTotal.indexOf('/') + 1] === '0'
      ) {
        M.toast({ html: 'Cannot divide by zero.' });
      } else {
        logic(splitTotal);
        let joinedTotal =
          Math.round(
            (parseFloat(splitTotal.join('')) + Number.EPSILON) * 10000
          ) / 10000;
        let recent = document.createElement('p');
        recent.innerHTML = oldTotal + ' = ' + joinedTotal;
        if (
          history.firstChild &&
          history.firstChild.innerHTML !== recent.innerHTML
        ) {
          history.insertBefore(recent, history.firstChild);
        } else if (!history.firstChild) {
          history.appendChild(recent);
        }
        total.innerHTML = `<div id='temporary'>${joinedTotal}</div>`;
      }
    }
  }
};

const logic = arr => {
  if (arr[arr.length - 1] === '') {
    arr.splice(arr.length - 2, 2);
  }
  while (arr.length > 1) {
    if (arr.join(' ').search(/[*/]/) > -1) {
      let index = arr.join('').indexOf(/[*/]/);
      let num2 = arr.splice(index, 1);
      let operator = arr.splice(index, 1);
      let num1 = arr.splice(index, 1, 'placeholder');
      let newTotal = operate(operator, num1, num2);
      arr.splice(arr.indexOf('placeholder'), 1, newTotal.toString());
    } else {
      let num1 = arr.splice(0, 1);
      let operator = arr.splice(0, 1);
      let num2 = arr.splice(0, 1);
      let newTotal = operate(operator, num1, num2);
      arr.unshift(newTotal);
    }
  }
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
  removeTemporary();
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
  operateTemporary();
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
  operateTemporary();
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
  removeTemporary();
  total.innerHTML = '';
  history.innerHTML = '';
};

const clearTotal = () => {
  removeTemporary();
  total.innerHTML = '';
};

const backspaceTotal = num => {
  operateTemporary();
  if (num) {
    while (num > 0) {
      total.innerHTML = total.innerHTML.substring(
        0,
        total.innerHTML.length - 1
      );
      num--;
    }
  } else {
    total.innerHTML = total.innerHTML.substring(0, total.innerHTML.length - 1);
  }
};

const removeTemporary = () => {
  if (Boolean(document.getElementById('temporary'))) {
    const temporary = document.getElementById('temporary');
    if (temporary.parentNode) {
      temporary.parentNode.removeChild(temporary);
    }
  }
};

const operateTemporary = () => {
  if (Boolean(document.getElementById('temporary'))) {
    const temporary = document.getElementById('temporary');
    const content = temporary.innerHTML;
    total.innerHTML = content;
    if (temporary.parentNode) {
      temporary.parentNode.removeChild(temporary);
    }
  }
};

window.addEventListener('keydown', e => {
  // console.log(`"${e.key}" = ${e.keyCode}`);
  // console.log(Boolean(/[.]/.test(e.key)));
  if (/\d/.test(e.key)) {
    num(e.key);
  } else if (/[-+*/]/.test(e.key)) {
    symbol(e.key);
  } else if (e.keyCode === 67) {
    clearTotal();
  } else if (e.keyCode === 8) {
    backspaceTotal();
  } else if (e.keyCode === 13) {
    equation();
  } else if (e.keyCode === 46) {
    clearAll();
  } else if (/[.]/.test(e.key)) {
    decimal();
  }
});
