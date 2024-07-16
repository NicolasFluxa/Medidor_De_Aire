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

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "Tu-API-Key",
    authDomain: "mediciondelaireycalidad.firebaseapp.com",
    databaseURL: "https://mediciondelaireycalidad-default-rtdb.firebaseio.com",
    projectId: "mediciondelaireycalidad",
    storageBucket: "mediciondelaireycalidad.appspot.com",
    messagingSenderId: "521899199564",
    appId: "1:521899199564:web:20aff93ffd3e74ab5d78e9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const ctxPM10 = document.getElementById('PM10').getContext('2d');
const myChartPM10 = new Chart(ctxPM10, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Partículas de PM 10 en ppm',
            data: [],
            backgroundColor: 'black',
            borderColor: 'black',
            borderWidth: 2,
            pointStyle: 'star',
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
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

function getCurrentTime(offsetSeconds = 0) {
    const now = new Date();
    now.setSeconds(now.getSeconds() - offsetSeconds);
    return now.toTimeString().split(' ')[0].slice(0, 5);
}

const PM10_ALTO = 120;
const PM10_MUY_ALTO = 170;

function updateChartPM10(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    myChartPM10.data.labels = [];
    myChartPM10.data.datasets[0].data = [];

    keys.forEach((key, index) => {
        const timeLabel = getCurrentTime((keys.length - index - 1) * 60);
        myChartPM10.data.labels.push(timeLabel);
        myChartPM10.data.datasets[0].data.push(values[index]);

        if (values[index] > PM10_MUY_ALTO) {
            alert(`¡Alerta! Las particulas de pm 10 han superado el umbral alto de ${PM10_ALTO} ppm`);
        } else if (values[index] > PM10_ALTO) {
            alert(`¡Alerta! Las particulas de pm 10 han superado el umbral alto de ${PM10_ALTO} ppm`);
        }
    });

    myChartPM10.update();
}

const dataRefPM10 = ref(database, 'Sensores/PM-10');

onValue(dataRefPM10, (snapshot) => {
    const dataPM10 = snapshot.val();
    updateChartPM10(dataPM10);
});

palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");

    const darkModeEnabled = body.classList.contains("dark-mode");

    myChartPM10.options.plugins.legend.labels.color = darkModeEnabled ? 'white' : 'black';
    myChartPM10.options.scales.y.ticks.color = darkModeEnabled ? 'white' : 'black';
    myChartPM10.options.scales.x.ticks.color = darkModeEnabled ? 'white' : 'black';
    myChartPM10.data.datasets[0].backgroundColor = darkModeEnabled ? 'white' : 'black';
    myChartPM10.data.datasets[0].borderColor = darkModeEnabled ? 'white' : 'black';
    myChartPM10.update();
});
