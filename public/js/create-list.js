const SHOW_CLASS = 'show';
const ERROR_CLASS = 'errored';
let canCopy = false;

const successHolder = document.getElementById('success');
const errorHolder = document.getElementById('error');
const resultInput = document.getElementById('resultInput');

async function showError(errorMsg, time, isValidation) {
  errorHolder.textContent = errorMsg;
  errorHolder.classList.add(SHOW_CLASS);
  if (isValidation) {
    await delay(hideError, time);
    return;
  }
  await delay(hideError, time);
}

function hideError() {
  errorHolder.classList.remove(SHOW_CLASS);
  errorHolder.textContent = ' ';
}

async function showSuccess(message, time) {
  successHolder.textContent = message;
  successHolder.classList.add(SHOW_CLASS);
  await delay(hideSuccess, time);
}

function hideSuccess() {
  successHolder.classList.remove(SHOW_CLASS);
  successHolder.textContent = ' ';
}

function delay(fn, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fn());
    }, time);
  });
}

resultInput.addEventListener('click', copyURL);

async function copyURL(e) {
  const result = resultInput.value;
  if (canCopy) {
    await navigator.clipboard.writeText(result);
    resultInput.value = 'copied to clipboard📋';
    await delay(() => {
      resultInput.value = result;
      console.log(result);
    }, 2000);
  }
}

function validateInputs(inputs = []) {
  let input = {};
  const hasErrors = inputs.some(({ i, field }) => {
    if (!i) {
      input = { i, field };
      return true;
    }
    return false;
  });
  return [hasErrors , input]
}

document.getElementById('createListBtn').addEventListener('click', async function () {
  const highPriorityInput = document.getElementById('highPriorityInput').value;
  const mediumPriorityInput = document.getElementById('mediumPriorityInput').value;
  const lowPriorityInput = document.getElementById('lowPriorityInput').value;

  const [hasErrors, input] = validateInputs([{ i: highPriorityInput, field: 'High Priority' }]);
  console.log(hasErrors, input);

  if (hasErrors) return await showError(`${input.field} cannot be empty!`, 3000);

  const essentials = highPriorityInput
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item);
  const less_essentials = mediumPriorityInput
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item);
  const non_essentials = lowPriorityInput
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item);

  const response = await fetch('/create', {
    method: 'POST',
    body: JSON.stringify({
      essentials,
      less_essentials,
      non_essentials,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseJSON = await response.json();

  if (response.status == 400) return await showError(responseJSON?.message, 3000, true);
  if (response.status !== 201) return await showError(responseJSON?.message, 3000);

  resultInput.value = responseJSON?.data.url;
  canCopy = true;
  await showSuccess(responseJSON.message, 2000);
});
