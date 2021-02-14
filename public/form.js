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

// Select close modal window button
const closeModalButton = document.getElementById('close-modal-button');

// Create variable to save validation status
let validForm;

form.onsubmit = (event) => {
  // Get values of input fields
  const usernameValue = username.value;
  const dayValue = day.value;
  const startTimeValue = startTime.value;
  const endTimeValue = endTime.value;


  event.preventDefault();
  clearValidation();

  // Validate username (not empty)
  if (!inputNotEmpty(usernameValue)) {
    usernameEmptyAlert.style.display = 'block';
    username.style.border = 'solid 1px #ffa300';
    validForm = false;
  };

  // Validate day (not empty)
  if (!inputNotEmpty(dayValue)) {
    dayEmptyAlert.style.display = 'block';
    day.style.border = 'solid 1px #ffa300';
    validForm = false;
  };

  console.log(startTimeValue)
  console.log(endTimeValue)
  console.log(dayValue)
  console.log(usernameValue)

  // Validate start time (not empty)
  if (!inputNotEmpty(startTimeValue)) {
    startTimeEmptyAlert.style.display = 'block';
    startTime.style.border = 'solid 1px #ffa300';
    validForm = false;
  };

  // Validate day (not empty)
  if (!inputNotEmpty(endTimeValue)) {
    endTimeEmptyAlert.style.display = 'block';
    endTime.style.border = 'solid 1px #ffa300';
    validForm = false;
  };

  // Validate time (end time is later than start time)
  if (!timeValid(startTimeValue, endTimeValue) && inputNotEmpty(startTimeValue) && inputNotEmpty(endTimeValue)) {
    timeInvalidAlert.style.display = 'block';
    endTime.style.border = 'solid 1px #ffa300';
    validForm = false;
  };

  if (!validForm) {
    return false;
  } else {
    event.target.reset();
    clearValidation();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    return true;
  };
};

closeModalButton.onclick = () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
};

const inputNotEmpty = (inputValue) => inputValue !== '';

const  timeValid = (startTimeValue, endTimeValue) => startTimeValue < endTimeValue;

const clearValidation = () => {
  validForm = true;

  usernameEmptyAlert.style.display = 'none';
  dayEmptyAlert.style.display = 'none';
  startTimeEmptyAlert.style.display = 'none';
  endTimeEmptyAlert.style.display = 'none';
  timeInvalidAlert.style.display = 'none';

  username.style.border = '';
  day.style.border = '';
  startTime.style.border = '';
  endTime.style.border = '';
};