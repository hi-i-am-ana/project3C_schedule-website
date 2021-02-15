const form = document.getElementById('form');

// Select input fields
const username = document.getElementById('username');
const day = document.getElementById('day');
const startTime = document.getElementById('start_time');
const endTime = document.getElementById('end_time');

// Select validation alerts
const usernameEmptyAlert = document.getElementById('username-empty-alert');
const dayEmptyAlert = document.getElementById('day-empty-alert');
const startTimeEmptyAlert = document.getElementById('start-time-empty-alert');
const endTimeEmptyAlert = document.getElementById('end-time-empty-alert');
const timeInvalidAlert = document.getElementById('time-invalid-alert');

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
  };

  // Validate day (must not be empty)
  if (!inputNotEmpty(dayValue)) {
    setInvalid(dayEmptyAlert, day);
  };

  // Validate start time (must be not empty)
  if (!inputNotEmpty(startTimeValue)) {
    setInvalid(startTimeEmptyAlert, startTime);
  };

  // Validate end time (must be not empty)
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

const inputNotEmpty = (inputValue) => inputValue !== '';

const  timeValid = (startTimeValue, endTimeValue) => startTimeValue < endTimeValue;

const setInvalid = (inputAlert, input) => {
  inputAlert.style.visibility = 'visible';
  input.style.border = 'solid 1px red';
  validForm = false;
};

const clearValidation = () => {
  validForm = true;

  usernameEmptyAlert.style.visibility = 'hidden';
  dayEmptyAlert.style.visibility = 'hidden';
  startTimeEmptyAlert.style.visibility = 'hidden';
  endTimeEmptyAlert.style.visibility = 'hidden';
  timeInvalidAlert.style.visibility = 'hidden';

  username.style.border = '';
  day.style.border = '';
  startTime.style.border = '';
  endTime.style.border = '';
};