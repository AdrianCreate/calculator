const keys = document.querySelector('.all-buttons');
const userInput = document.querySelector('#user-input');
const calculator = document.querySelector('.calculator');
const displayResult = document.querySelector('#result');



keys.addEventListener('click' , e => {
  if(e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = displayResult.textContent;

    if (!action) {
      if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator') {
        displayResult.textContent = keyContent;
      } else {
        displayResult.textContent += keyContent;
      }
    }
    if(
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
      if (calculator.dataset.previousKeyType !== 'operator') {
        userInput.textContent += `${displayedNum} ${keyContent}`;
      }
      calculator.dataset.previousKeyType = 'operator';
      displayResult.textContent = '';
    }
    if(action === 'decimal') {
      displayResult.textContent = displayedNum + '.';
    }
    if(action === 'percentage') {
      displayResult.textContent = parseFloat(displayedNum) / 100;
    }
    if(action === 'delete') {
      if(displayedNum.length === 1) {
        displayResult.textContent = '0';
      } else {
        displayResult.textContent = displayedNum.slice(0, -1);
      }
    }
    if(action === 'clear') {
      displayResult.textContent = '0';
      userInput.textContent = '';
    }
    if(action === 'equal') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      let result;
      switch (operator) {
        case 'add':
          result = parseFloat(firstValue) + parseFloat(secondValue);
          break;
        case 'subtract':
          result = parseFloat(firstValue) - parseFloat(secondValue);
          break;
        case 'multiply':
          result = parseFloat(firstValue) * parseFloat(secondValue);
          break;
        case 'divide':
          result = parseFloat(firstValue) / parseFloat(secondValue);
          break;
        default:
          return;
      }
      displayResult.textContent = result;
      userInput.textContent = `${firstValue} ${operator} ${secondValue} = `;
      calculator.dataset.previousKeyType = 'equal'
    }
    calculator.dataset.previousKeyType = action;
  }
});
