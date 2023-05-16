const toggle = document.getElementById('toggle');
const throtRange = document.getElementById('throtRange');
const throtManual = document.getElementById('throtManual');
const throtSet = document.getElementById('throtSet');

let throttle = 0;
let started = false;

document.getElementById('toggle').addEventListener('click', () => {
    started = !started;

    throtRange.disabled = !started;
    throtRange.value = 0;

    throtManual.disabled = !started;
    throtManual.value = '';
    throtSet.disabled = true;

    if (started) toggle.classList.add('started');
    else toggle.classList.remove('started');

    toggle.innerHTML = started ? 'On' : 'Off';
    
    throttle = 0;

    fetch(`/motor/${toggle.innerHTML.toLowerCase()}`)
            .then(response => response.text())
            .then(data => updateStatus(data))
            .catch(error => console.log('Error:', error));
});


throtRange.addEventListener('input', () => {
    if (!started) return;
    throttle = parseFloat(throtRange.value).toFixed(2);

    motorControlUpdate();
});

throtManual.addEventListener('input', () => {
    if (!started) return;
    if (throtManual.value != '') throtSet.disabled = false;
    else throtSet.disabled = true;
});
throtManual.addEventListener('keypress', (e) => {
    if (!started) return;
    if (e.key == 'Enter') throtSet.click();
});

throtSet.addEventListener('click', () => {
    if (!started) return;
    input = parseFloat(throtManual.value/100).toFixed(2);
    throttle = input > 1 ? 1 : input < 0 ? 0 : input;
    throtRange.value = throttle;
    throtManual.value = '';
    throtSet.disabled = true;

    motorControlUpdate();

});





function updateStatus(status) {
    document.getElementById('stat').innerHTML = status;
}

function motorControlUpdate() {
    fetch(`/motor/control?number=${throttle}`)
        .then(response => response.text())
        .then(data => updateStatus(data))
        .catch(error => console.log('Error:', error));
}