let speedBtns = document.getElementsByClassName('speedBtn');

let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let stat = document.getElementById('stat');


let started = false;

document.getElementById('startBtn').addEventListener('click', () => {
    started = !started;
    
    if (started) {
        startBtn.classList.add('active');
        startBtn.innerHTML = 'On';
        speedBtns[0].click();

        // API Call for activating motor

    } else {
        stat.innerHTML = '0';
        startBtn.classList.remove('active');
        startBtn.innerHTML = 'Off';
        stat.innerHTML = "Stopped"
        for (let button of speedBtns) button.classList.remove('selected');

        // API Call for deactivating motor
    }
});

for (let button of speedBtns) {
    button.addEventListener('click', function () {
        
        if (started) {
            for (let button of speedBtns) button.classList.remove('selected');
            stat.innerHTML = `Running at speed ${button.innerHTML}`
            button.classList.add('selected');


            // API Call for setting motor speed to button.innerHTML

        };
    })
}

document.addEventListener('keydown', (e) => {
    if (e.key == ' ') startBtn.click();
    else if (started && e.keyCode == 37) {
        console.log('left')
        for (let i = 0; i < speedBtns.length; i++) {
            if (speedBtns[i].classList.contains('selected')) {
                if (i > 0) speedBtns[i-1].click();
                break;
            }
        }
    } else if (started && e.keyCode == 39) {
        console.log('right')
        for (let i = 0; i < speedBtns.length; i++) {
            if (speedBtns[i].classList.contains('selected')) {
                if (i < speedBtns.length - 1) speedBtns[i+1].click();
                break;
            }
        }
    }
});