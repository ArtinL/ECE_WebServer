const toggle = document.getElementById('toggle');
const throtRange = document.getElementById('throtRange');
const throtSet = document.getElementById('throtSet');
const throtDisplay = document.getElementById('throtDisplay');

let throttle = 0;
let started = false;

document.getElementById('toggle').addEventListener('click', () => {
    started = !started;

    throtRange.disabled = !started;
    throtRange.value = 0;
    throtDisplay.innerHTML = 0;
    throtSet.disabled = !started;

    if (started) toggle.classList.add('started');
    else toggle.classList.remove('started');

    toggle.innerHTML = started ? 'On' : 'Off';

    throtDisplay.style.color = started ? 'black' : 'gray';
    
    throttle = 0;

    fetch(`/motor/${toggle.innerHTML.toLowerCase()}`)
            .then(response => response.text())
            .then(data => updateStatus(data))
            .catch(error => console.log('Error:', error));
});


throtRange.addEventListener('input', () => {
    throttle = parseFloat(throtRange.value).toFixed(2)
    throtDisplay.innerHTML = throttle*10;
});

document.addEventListener('keypress', (e) => {

    if (e.key == 'Enter') throtSet.click();
});

throtSet.addEventListener('click', () =>  motorControlUpdate());





function updateStatus(status) {
    document.getElementById('stat').innerHTML = status;
}

function motorControlUpdate() {
    fetch(`/motor/control?number=${throttle}`)
        .then(response => response.text())
        .then(data => updateStatus(data))
        .catch(error => console.log('Error:', error));
}