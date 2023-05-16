let startBtn = document.getElementById('startBtn');
let stat = document.getElementById('stat');
let speedRange = document.getElementById('speedRange');

let speed = 0;

let started = false;

document.getElementById('startBtn').addEventListener('click', () => {
    started = !started;
    
    if (started) {
        speedRange.disabled = false;
        startBtn.classList.add('started');
        startBtn.innerHTML = 'On';  
        speed = 1;
        stat.innerHTML = `Running at speed ${speed}`
        // API Call for activating motor

    } else {
        speedRange.disabled = true;
        speed = 0;

        speedRange.value = 0;
        startBtn.classList.remove('started');
        startBtn.innerHTML = 'Off';
        stat.innerHTML = "Stopped"

        // API Call for deactivating motor
    }
});


speedRange.addEventListener('input', () => {
    if (started) {
        speed = speedRange.value;
        stat.innerHTML = `Running at speed ${speed}`;
    }
});

document.addEventListener('keydown', (e) => {

    if (document.activeElement !== startBtn && e.key == ' ') startBtn.click();
    
    else if (document.activeElement !== speedRange && started && e.key.includes('Arrow')) {
        if (e.key == "ArrowLeft" || e.key == "ArrowDown") speedRange.value = --speed;
        else if (e.key == "ArrowRight" || e.key == "ArrowUp") speedRange.value = ++speed;
        speedRange.dispatchEvent(new Event('input'));

    }
    
});