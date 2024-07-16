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
    apiKey: "AIzaSyCCF3YTs9VkbbFf8Th3FZzZzqKBsn566xk",
    authDomain: "mediciondelaireycalidad.firebaseapp.com",
    databaseURL: "https://mediciondelaireycalidad-default-rtdb.firebaseio.com",
    projectId: "mediciondelaireycalidad",
    storageBucket: "mediciondelaireycalidad.appspot.com",
    messagingSenderId: "521899199564",
    appId: "1:521899199564:web:20aff93ffd3e74ab5d78e9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const ctx = document.getElementById('Humedad').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '% Humedad ambiente',
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
    return now.toTimeString().split(' ')[0].slice(0, 5); // HH:MM
}

const HUMEDAD_ALTA = 90;
const HUMEDAD_BAJA = 20;

function updateChart(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];

    keys.forEach((key, index) => {
        const timeLabel = getCurrentTime((keys.length - index - 1) * 60);
        myChart.data.labels.push(timeLabel);
        myChart.data.datasets[0].data.push(values[index]);

        if (values[index] > HUMEDAD_ALTA) {
            alert(`¡Alerta! La humedad ha superado el umbral alto de ${HUMEDAD_ALTA}%`);
        } else if (values[index] < HUMEDAD_BAJA) {
            alert(`¡Alerta! La humedad ha bajado del umbral bajo de ${HUMEDAD_BAJA}%`);
        }
    });

    myChart.update();
}

const dataRef = ref(database, 'Sensores/Humedad');

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    updateChart(data);
});

palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");

    const darkModeEnabled = body.classList.contains("dark-mode");

    myChart.options.plugins.legend.labels.color = darkModeEnabled ? 'white' : 'black';
    myChart.options.scales.y.ticks.color = darkModeEnabled ? 'white' : 'black';
    myChart.options.scales.x.ticks.color = darkModeEnabled ? 'white' : 'black';
    myChart.data.datasets[0].backgroundColor = darkModeEnabled ? 'white' : 'black';
    myChart.data.datasets[0].borderColor = darkModeEnabled ? 'white' : 'black';
    myChart.update();
});
