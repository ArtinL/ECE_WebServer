const toggle = document.getElementById('toggle');
const throtRange = document.getElementById('throtRange');
const throtSet = document.getElementById('throtSet');
const throtDisplay = document.getElementById('throtDisplay');

let throttle = 0;
let started = false;

document.getElementById('toggle').addEventListener('click', () => {
    started = !started;
    if (!started) motorControlUpdate(`control?number=${0}`, 100);

    throtRange.disabled = !started;
    throtRange.value = 0;
    throtDisplay.innerHTML = 0;
    throtSet.disabled = !started;

    if (started) toggle.classList.add('started');
    else toggle.classList.remove('started');

    toggle.innerHTML = started ? 'On' : 'Off';

    throtDisplay.style.color = started ? 'black' : 'gray';
    
    throttle = 0;

    motorControlUpdate(toggle.innerHTML.toLowerCase());
    
    
});

throtRange.addEventListener('input', () => {
    throttle = parseFloat(throtRange.value).toFixed(2)
    throtDisplay.innerHTML = throttle*10;
});

document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') throtSet.click();
});

throtSet.addEventListener('click', () =>  motorControlUpdate(`control?number=${throttle}`));


function updateStatus(status) {
    document.getElementById('stat').innerHTML = status;
}

function motorControlUpdate(request, delay=1000) {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => button.disabled = true);
    updateStatus('Updating...');
    
    setTimeout(() => {
        fetch(`/motor/${request}`)
            .then(response => response.text())
            .then(data => updateStatus(data))
            .catch(error => console.log('Error:', error));
        allButtons.forEach(button => button.disabled = false);
        if (!started) throtSet.disabled = true;
    }, delay);   
}