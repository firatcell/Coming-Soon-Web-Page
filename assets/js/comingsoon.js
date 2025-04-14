const countdown = () => {
    const countDate = new Date("2025-05-31T00:00:00").getTime();
    const currentTime = new Date().getTime();
    const gap = countDate - currentTime;

    if (gap <= 0) {
        document.querySelector('.day').innerText = 0;
        document.querySelector('.hour').innerText = 0;
        document.querySelector('.minutes').innerText = 0;
        document.querySelector('.seconds').innerText = 0;
        clearInterval(timerInterval); // stop the interval if needed
        // Optionally, display a message like "We're live!" or "Time's up"
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

const timerInterval = setInterval(countdown, 250);
