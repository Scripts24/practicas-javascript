
// Variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00"

// Cuando cargue la página
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// Empieza el timer
function start() {
    // Cambio botón de start a reset
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // Cambiar el tiempo
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    // Cuenta regresiva
    let timerFunction = () => {

        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // Empezar
        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                if (breakCount % 2 === 0) {
                    // Empieza el descanso
                    workMinutes = breakMinutes;
                    breakCount++

                    // Cambio panel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // Continuar trabajando
                    workMinutes = workTime;
                    breakCount++

                    // Cambio panel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // Comienzo cuenta regresiva
    setInterval(timerFunction, 1000); // 1000 = 1s
}