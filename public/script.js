let startBtn = document.getElementById('startBtn');
let stat = document.getElementById('stat');
let throttleRange = document.getElementById('throttleRange');

let throttle = 0;

let started = false;

document.getElementById('startBtn').addEventListener('click', () => {
    started = !started;
    
    if (started) {
        throttleRange.disabled = false;
        startBtn.classList.add('started');
        startBtn.innerHTML = 'On';  
        // API Call for activating motor

        fetch('/motor/on')
            .then(response => response.text())
            .then(data => updateStatus(data))
            .catch(error => console.log('Error:', error));

    } else {
        throttleRange.disabled = true;
        throttleRange.value = 0;
        startBtn.classList.remove('started');
        startBtn.innerHTML = 'Off';
        
        throttle = 0;

        // API Call for deactivating motor
        fetch('/motor/off')
            .then(response => response.text())
            .then(data => updateStatus(data))
            .catch(error => console.log('Error:', error));
    }
});


throttleRange.addEventListener('input', () => {
    if (started) {
        throttle = throttleRange.value;
        //stat.innerHTML = `Running at throttle ${throttle}`;

        fetch(`/motor/control?number=${throttle}`)
            .then(response => response.text())
            .then(data => updateStatus(data))
            .catch(error => console.log('Error:', error));
    }
});

document.addEventListener('keydown', (e) => {

    if (document.activeElement !== startBtn && e.key == ' ') startBtn.click();
    
    else if (document.activeElement !== throttleRange && started && e.key.includes('Arrow')) {
        if (e.key == "ArrowLeft" || e.key == "ArrowDown") throttleRange.value = --throttle;
        else if (e.key == "ArrowRight" || e.key == "ArrowUp") throttleRange.value = ++throttle;
        throttleRange.dispatchEvent(new Event('input'));

    }
    
});

function updateStatus(status) {
    stat.innerHTML = status;
}