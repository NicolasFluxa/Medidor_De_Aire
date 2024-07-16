const casa = document.getElementById("casa");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulos");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

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

palanca.addEventListener("click", () => {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");

    const darkModeEnabled = body.classList.contains("dark-mode");

    charts.forEach(chart => {
        chart.options.plugins.legend.labels.color = darkModeEnabled ? 'white' : 'black';
        chart.options.scales.y.ticks.color = darkModeEnabled ? 'white' : 'black';
        chart.options.scales.x.ticks.color = darkModeEnabled ? 'white' : 'black';
        chart.data.datasets[0].backgroundColor = darkModeEnabled ? 'white' : 'black';
        chart.data.datasets[0].borderColor = darkModeEnabled ? 'white' : 'black';
        chart.update();
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

const chartConfigs = [
    { id: 'PM10', label: 'PM10 en ppm', firebasePath: 'Sensores/PM-10', alertThreshold: 150 },
    { id: 'PM25', label: 'PM25 en ppm', firebasePath: 'Sensores/PM-2,5', alertThreshold: 170 },
    { id: 'TEMPERATURA', label: 'Temperatura en °C', firebasePath: 'Sensores/Temperatura', alertThreshold: 30 },
    { id: 'OZONO', label: 'Ozono en ppm', firebasePath: null, alertThreshold: 130 },
    { id: 'HUMEDAD', label: 'Humedad en %', firebasePath: 'Sensores/Humedad', alertThreshold: 85 },
    { id: 'CO2', label: 'CO2 en ppm', firebasePath: 'Sensores/MQ-135', alertThreshold: 1000 }
];

const charts = [];

chartConfigs.forEach(config => {
    const ctx = document.getElementById(config.id).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: config.label,
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
                    beginAtZero: true
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
    charts.push(myChart);

    function getCurrentTime(offsetSeconds = 0) {
        const now = new Date();
        now.setSeconds(now.getSeconds() - offsetSeconds);
        return now.toTimeString().split(' ')[0].slice(0, 5);
    }

    function generateAlert(message) {
        alert(message);
    }

    function updateChart(chart, data, threshold, label) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        chart.data.labels = [];
        chart.data.datasets[0].data = [];

        keys.forEach((key, index) => {
            const timeLabel = getCurrentTime((keys.length - index - 1) * 60);
            chart.data.labels.push(timeLabel);
            const value = values[index];
            chart.data.datasets[0].data.push(value);

            if (value > threshold) {
                generateAlert(`¡Alerta! El valor de ${label} ha excedido el umbral de ${threshold}. Valor actual: ${value}`);
            }
        });

        chart.update();
    }

    if (config.firebasePath) {
        const dataRef = ref(database, config.firebasePath);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            updateChart(myChart, data, config.alertThreshold, config.label);
        });
    } else {
        setInterval(() => {
            const timeLabel = getCurrentTime();
            const randomValue = Math.floor(Math.random() * 100);
            myChart.data.labels.push(timeLabel);
            myChart.data.datasets[0].data.push(randomValue);

            if (randomValue > config.alertThreshold) {
                generateAlert(`¡Alerta! El valor de ${config.label} ha excedido el umbral de ${config.alertThreshold}. Valor actual: ${randomValue}`);
            }

            if (myChart.data.labels.length > 20) {
                myChart.data.labels.shift();
                myChart.data.datasets[0].data.shift();
            }

            myChart.update();
        }, 60000);
    }
});
