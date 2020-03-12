// To do: allow the user to input negative numbers using the subtract button

const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');
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

window.addEventListener('click', e => {
  // console.log(e.target);
  // console.log(Boolean(e.target.id));
  // console.log('\n');
  if (
    e.target.id === 'arrow_back' ||
    e.target.id === 'subdirectory_arrow_left'
  ) {
    const btn = document.getElementById(`${e.target.parentNode.parentNode.id}`);
    if (btn) {
      btn.classList.add('active');
    }
  } else if (e.target.id) {
    const btn = document.getElementById(`${e.target.id}`);
    if (btn) {
      btn.classList.add('active');
    }
  } else {
    const btn = document.getElementById(`${e.target.parentNode.id}`);
    if (btn) {
      btn.classList.add('active');
    }
  }
});

window.addEventListener('keydown', e => {
  if (/\d/.test(e.key)) {
    const btn = document.getElementById(`${e.key}`);
    btn.classList.add('active');
    num(e.key);
  } else if (/[-+*/]/.test(e.key)) {
    const btn = document.getElementById(`${e.key}`);
    btn.classList.add('active');
    symbol(e.key);
  } else if (e.keyCode === 67) {
    const btn = document.getElementById('c');
    btn.classList.add('active');
    clearTotal();
  } else if (e.keyCode === 8) {
    const btn = document.getElementById('backspace');
    btn.classList.add('active');
    backspaceTotal();
  } else if (e.keyCode === 13) {
    const btn = document.getElementById('equals');
    btn.classList.add('active');
    equation();
  } else if (e.keyCode === 46) {
    const btn = document.getElementById('del');
    btn.classList.add('active');
    clearAll();
  } else if (/[.]/.test(e.key)) {
    const btn = document.getElementById('dot');
    btn.classList.add('active');
    decimal();
  }
});

buttons.forEach(btn =>
  btn.addEventListener('transitionend', e => {
    btn.classList.remove('active');
  })
);
