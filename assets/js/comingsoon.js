let timeOffset = 0; // Global offset between external standardized time and local time
let timerInterval;  // Reference for the interval

const countdown = () => {
  const countDate = new Date("2025-04-14T13:37:00").getTime();
  const currentTime = Date.now() + timeOffset;
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

fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
  .then(response => response.json())
  .then(data => {
    const standardTime = data.unixtime * 1000;
    timeOffset = standardTime - Date.now();
    startCountdown();
  })
  .catch(error => {
    console.error("Error fetching standardized time:", error);
    // Fallback: use local time if fetching fails
    startCountdown();
  });
