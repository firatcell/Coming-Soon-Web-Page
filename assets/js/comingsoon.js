let timeOffset = 0;   // The offset between the external (correct) time and the system's time
let timerInterval;    // Reference to the countdown interval

// Returns the corrected (standardized) current time in milliseconds.
const getCorrectedTime = () => {
  return Date.now() + timeOffset;
};

const countdown = () => {
  // Ensure you have the correct target time.
  // Append "Z" to indicate UTC time; adjust if necessary.
  const countDate = new Date("2025-05-31T13:37:00Z").getTime();
  const currentTime = getCorrectedTime();
  const gap = countDate - currentTime;

  if (gap <= 0) {
    document.querySelector('.day').innerText = 0;
    document.querySelector('.hour').innerText = 0;
    document.querySelector('.minutes').innerText = 0;
    document.querySelector('.seconds').innerText = 0;
    clearInterval(timerInterval);
    return;
  }

  const millisecond = 1;
  const second = millisecond * 1000;
  const minutes = second * 60;
  const hour = minutes * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinutes = Math.floor((gap % hour) / minutes);
  const textSecond = Math.floor((gap % minutes) / second);

  document.querySelector('.day').innerText = textDay;
  document.querySelector('.hour').innerText = textHour;
  document.querySelector('.minutes').innerText = textMinutes;
  document.querySelector('.seconds').innerText = textSecond;
};

const startCountdown = () => {
  timerInterval = setInterval(countdown, 250);
};

// This function fetches the standardized current time from a trusted source (UK time).
// Note: Europe/London automatically accounts for BST/GMT differences.
const fetchAndSetCorrectTime = () => {
  fetch('https://worldtimeapi.org/api/timezone/Europe/London')
    .then(response => response.json())
    .then(data => {
      // data.datetime is typically in the format "2025-04-14T13:37:15.123456+01:00"
      // Convert it to a Date object and compute the offset against the system time.
      const externalTime = new Date(data.datetime).getTime();
      timeOffset = externalTime - Date.now();
      console.log("Time offset set to:", timeOffset, "ms");
      startCountdown();
    })
    .catch(error => {
      console.error("Error fetching standardized time:", error);
      // Fallback: use system time if external fetch fails.
      startCountdown();
    });
};

fetchAndSetCorrectTime();
