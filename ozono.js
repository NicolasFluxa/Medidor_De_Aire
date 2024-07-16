const casa = document.getElementById("casa");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulos");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

document.getElementById("volver-vista-general").addEventListener("click", () => {
    window.location.href = "vista_general.html";
});

menu.addEventListener("click", () => {
    barraLateral.classList.toggle("max-barra-lateral");
    if (barraLateral.classList.contains("max-barra-lateral")) {
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    } else {
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if (window.innerWidth <= 320) {
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach(span => {
            span.classList.add("oculto");
        });
    }
});

casa.addEventListener("click", () => {
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");

    spans.forEach(span => {
        span.classList.toggle("oculto");
    });
});

const ctx = document.getElementById('Ozono').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Particulas de ozono en...',
            data: [],
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 2,
            pointStyle: 'line',
            fill: false 
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                min: 5,
                max: 20
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black' 
                }
            }
        }
    }
});

function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomData() {
    const currentTime = getCurrentTime();
    const newData = getRandomNumber(10, 13); 
    chart.data.datasets[0].data.push(newData);
    chart.data.labels.push(currentTime);
    chart.update();

    if (newData > 15) {
        mostrarAlerta("Alto", newData);
    }
}

setInterval(addRandomData, 60000);

function mostrarAlerta(nivel, valor) {
    alert(`Nivel de Ozono ${nivel}: ${valor}`);
}

palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");

    const darkModeEnabled = body.classList.contains("dark-mode");

    chart.options.plugins.legend.labels.color = darkModeEnabled ? 'white' : 'black';
    chart.options.scales.y.ticks.color = darkModeEnabled ? 'white' : 'black';
    chart.options.scales.x.ticks.color = darkModeEnabled ? 'white' : 'black';
    chart.data.datasets[0].backgroundColor = darkModeEnabled ? 'white' : 'black';
    chart.data.datasets[0].borderColor = darkModeEnabled ? 'white' : 'black';
    chart.update();
});
