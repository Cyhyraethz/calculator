// To do: add calculator button tooltips with keyboard shortcuts
// To do: add a significant delay to calculator button tooltips

const history = document.getElementById('history');
const total = document.getElementById('total');

const equation = () => {
  const lastChar = total.innerHTML[total.innerHTML.length - 1];
  if (!document.getElementById('temporary')) {
    if (!total.innerHTML) {
      return;
    } else if (total.innerHTML === '-') {
      backspaceTotal();
      return;
    } else if (lastChar === '-') {
      backspaceTotal();
      backspaceTotal();
    } else if (lastChar === ' ') {
      backspaceTotal();
    }
    const oldArr = [];
    total.innerHTML.split(' ').forEach(item => {
      if (!isNaN(parseFloat(item))) {
        item = Math.round((parseFloat(item) + Number.EPSILON) * 10000) / 10000;
      }
      oldArr.push(item);
    });
    const oldTotal = oldArr.join(' ');
    const splitTotal = total.innerHTML.split(' ');
    if (
      splitTotal.indexOf('/') > -1 &&
      splitTotal[splitTotal.indexOf('/') + 1] === '0'
    ) {
      M.toast({ html: 'Cannot divide by zero.' });
    } else {
      logic(splitTotal);
      const joinedTotal =
        Math.round((parseFloat(splitTotal.join('')) + Number.EPSILON) * 10000) /
        10000;
      const recent = document.createElement('p');
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
};

const logic = arr => {
  if (arr[arr.length - 1] === '') {
    arr.splice(arr.length - 2, 2);
  }
  while (arr.length > 1) {
    if (arr.join(' ').search(/[*/]/) > -1) {
      const index = arr.join('').indexOf(/[*/]/);
      const num2 = arr.splice(index, 1);
      const operator = arr.splice(index, 1);
      const num1 = arr.splice(index, 1, 'placeholder');
      const newTotal = operate(operator, num1, num2);
      arr.splice(arr.indexOf('placeholder'), 1, newTotal.toString());
    } else {
      const num1 = arr.splice(0, 1);
      const operator = arr.splice(0, 1);
      const num2 = arr.splice(0, 1);
      const newTotal = operate(operator, num1, num2);
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
  const splitTotal = total.innerHTML.split(' ');
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
  const splitTotal = total.innerHTML.split(' ');
  const lastNum = splitTotal[splitTotal.length - 1];
  const lastSymbol = splitTotal[splitTotal.length - 2];
  if (!isNaN(parseFloat(lastNum))) {
    if (lastNum[lastNum.length - 1] === '.') {
      backspaceTotal();
    }
    total.innerHTML += ` ${symbol} `;
  } else if (lastNum === '' && symbol === '-') {
    if (lastSymbol === '*' || lastSymbol === '/' || lastSymbol === undefined) {
      total.innerHTML += symbol;
    } else if (lastSymbol === '+') {
      backspaceTotal();
      total.innerHTML += ` ${symbol} `;
    }
  } else if (
    lastNum === '' &&
    symbol.search(/[+*/]/) > -1 &&
    total.innerHTML.length > 0
  ) {
    backspaceTotal();
    total.innerHTML += ` ${symbol} `;
  } else if (lastNum === '-') {
    if (lastSymbol === '*' || lastSymbol === '/') {
      backspaceTotal();
      backspaceTotal();
      total.innerHTML += ` ${symbol} `;
    }
  }
};

const decimal = () => {
  operateTemporary();
  const splitTotal = total.innerHTML.split(' ');
  const lastNum = splitTotal[splitTotal.length - 1];
  if (lastNum.indexOf('.') < 0) {
    if (lastNum.length < 1 || lastNum === '-') {
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
  const threeLess = total.innerHTML.substring(0, total.innerHTML.length - 3);
  const oneLess = total.innerHTML.substring(0, total.innerHTML.length - 1);
  const str = total.innerHTML.substring(0, total.innerHTML.length);
  const last = str[str.length - 1];
  operateTemporary();
  if (str.length > 1 && last === ' ') {
    total.innerHTML = threeLess;
  } else {
    total.innerHTML = oneLess;
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
  if (/\d/.test(e.key) && /[F]/.test(e.key) === false) {
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

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('transitionend', e => {
    btn.classList.remove('active');
  });
});
