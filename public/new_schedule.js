const form = document.getElementById('form');

// Select input fields
const username = document.getElementById('username');
const day = document.getElementById('day');
const startTime = document.getElementById('start_time');
const endTime = document.getElementById('end_time');

// Select validation alerts
const usernameEmptyAlert = document.getElementById('username-empty-alert');
const usernameInvalidAlert = document.getElementById('username-invalid-alert');
const dayEmptyAlert = document.getElementById('day-empty-alert');
const startTimeEmptyAlert = document.getElementById('start-time-empty-alert');
const endTimeEmptyAlert = document.getElementById('end-time-empty-alert');
const timeInvalidAlert = document.getElementById('time-invalid-alert');

const closeModalButton = document.getElementById('close-modal-button');
const modal = document.getElementById('modal');

// Create variable to save validation status
let validForm;

form.onsubmit = (event) => {
  // Get values of input fields
  const usernameValue = username.value;
  const dayValue = day.value;
  const startTimeValue = startTime.value;
  const endTimeValue = endTime.value;

  clearValidation();

  // Validate username (must not be empty)
  if (!inputNotEmpty(usernameValue)) {
    setInvalid(usernameEmptyAlert, username);
  } else if (!usernameValid(usernameValue)) {
    setInvalid(usernameInvalidAlert, username);
  };

  // Validate day (must not be empty)
  if (!inputNotEmpty(dayValue)) {
    setInvalid(dayEmptyAlert, day);
  };

  // Validate start time (must not be empty)
  if (!inputNotEmpty(startTimeValue)) {
    setInvalid(startTimeEmptyAlert, startTime);
  };

  // Validate end time (must not be empty)
  if (!inputNotEmpty(endTimeValue)) {
    setInvalid(endTimeEmptyAlert, endTime);
  };

  // Validate time (end time must be later than start time)
  if (!timeValid(startTimeValue, endTimeValue) && inputNotEmpty(startTimeValue) && inputNotEmpty(endTimeValue)) {
    setInvalid(timeInvalidAlert, endTime);
  };

  if (!validForm) {
    event.preventDefault();
  };
};

closeModalButton.onclick = (event) => {
  modal.classList.remove('display-block');
}

const inputNotEmpty = (inputValue) => inputValue !== '';

const  timeValid = (startTimeValue, endTimeValue) => startTimeValue < endTimeValue;

const usernameValid = (usernameValue) => {
  const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  return usernameRegex.test(usernameValue);
}

const setInvalid = (inputAlert, input) => {
  inputAlert.style.display = 'inline';
  input.style.border = 'solid 1px red';
  validForm = false;
};

const clearValidation = () => {
  validForm = true;

  usernameEmptyAlert.style.display = 'none';
  usernameInvalidAlert.style.display = 'none';
  dayEmptyAlert.style.display = 'none';
  startTimeEmptyAlert.style.display = 'none';
  endTimeEmptyAlert.style.display = 'none';
  timeInvalidAlert.style.display = 'none';

  username.style.border = '';
  day.style.border = '';
  startTime.style.border = '';
  endTime.style.border = '';
};