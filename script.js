/*==================================================
KATRU LITE DASHBOARD V3
script.js
PART 1
Core Engine
==================================================*/

/*=========================================
LIVE CLOCK
=========================================*/

function updateClock(){

const now=new Date();

document.getElementById("clock").innerHTML=

now.toLocaleTimeString();

document.getElementById("currentDate").innerHTML=

now.toDateString();

}

setInterval(updateClock,1000);

updateClock();

/*=========================================
CURRENT FACILITY
=========================================*/

let currentFacility="Public Toilet";

/*=========================================
FACILITY SELECTION
=========================================*/

document.querySelectorAll(".facility").forEach(function(card){

card.addEventListener("click",function(){

document.querySelectorAll(".facility").forEach(function(item){

item.classList.remove("active");

});

this.classList.add("active");

currentFacility=this.querySelector("h3").innerHTML;

document.getElementById("facilityName").value=currentFacility;

document.getElementById("deviceLocation").innerHTML=currentFacility;

updateDashboard();

});

});

/*=========================================
MASTER DASHBOARD FUNCTION
=========================================*/

function updateDashboard(){

const co2=Number(document.getElementById("co2Input").value);

const nh3=Number(document.getElementById("nh3Input").value);

const h2s=Number(document.getElementById("h2sInput").value);

const tvoc=Number(document.getElementById("tvocInput").value);

const pm=Number(document.getElementById("pmInput").value);

const temp=Number(document.getElementById("tempInput").value);

const humidity=Number(document.getElementById("humidityInput").value);

/* Update Sensor Cards */

document.getElementById("co2Value").innerHTML=co2;

document.getElementById("nh3Value").innerHTML=nh3;

document.getElementById("h2sValue").innerHTML=h2s;

document.getElementById("tvocValue").innerHTML=tvoc;

document.getElementById("pmValue").innerHTML=pm;

document.getElementById("tempValue").innerHTML=temp+"°C";

document.getElementById("humidityValue").innerHTML=humidity+"%";

/* Update Gauge Labels */

document.getElementById("co2GaugeValue").innerHTML=co2+" ppm";

document.getElementById("nh3GaugeValue").innerHTML=nh3+" ppm";

document.getElementById("h2sGaugeValue").innerHTML=h2s+" ppm";

/* Call Remaining Modules */

updateLevels();

updateHealth();

updateAI();

updateChart();

updateGauge();

updateSMS();

updateEmail();

updateWhatsApp();

updateAlertHistory();

}

/*=========================================
REFRESH BUTTON
=========================================*/

document.querySelector(".refresh").onclick=function(){

updateDashboard();

};

/*=========================================
AUTO DEMO
=========================================*/

document.getElementById("autoDemo").onclick=function(){

setInterval(function(){

document.getElementById("co2Input").value=

Math.floor(Math.random()*1200)+350;

document.getElementById("nh3Input").value=

Math.floor(Math.random()*60);

document.getElementById("h2sInput").value=

Math.floor(Math.random()*15);

document.getElementById("tvocInput").value=

Math.floor(Math.random()*700);

document.getElementById("pmInput").value=

Math.floor(Math.random()*100);

document.getElementById("tempInput").value=

Math.floor(Math.random()*18)+22;

document.getElementById("humidityInput").value=

Math.floor(Math.random()*45)+40;

updateDashboard();

},3000);

};

/*=========================================
INITIAL LOAD
=========================================*/

window.onload=function(){

updateDashboard();

};

console.log("KatrU Lite Core Engine Loaded");

/*==================================================
SCRIPT.JS V3
PART 2
AI Decision Engine
Threshold Engine
Health Score
Alerts
==================================================*/

/*=========================================
THRESHOLD VALUES
=========================================*/

const limits={

co2:{safe:800,warning:1000},

nh3:{safe:25,warning:50},

h2s:{safe:5,warning:10},

tvoc:{safe:300,warning:500},

pm:{safe:35,warning:75},

temp:{safe:35,warning:40},

humidity:{safe:75,warning:90}

};

/*=========================================
CHECK LEVEL
=========================================*/

function getLevel(value,safe,warning){

if(value<=safe){

return "SAFE";

}

if(value<=warning){

return "WARNING";

}

return "CRITICAL";

}

/*=========================================
CARD COLOR UPDATE
=========================================*/

function setCard(card,status,label){

card.classList.remove(

"green",

"yellow",

"red"

);

if(status=="SAFE"){

card.classList.add("green");

label.innerHTML="SAFE";

}

else if(status=="WARNING"){

card.classList.add("yellow");

label.innerHTML="WARNING";

}

else{

card.classList.add("red");

label.innerHTML="CRITICAL";

}

}

/*=========================================
UPDATE SENSOR LEVELS
=========================================*/

function updateLevels(){

const co2=Number(co2Input.value);

const nh3=Number(nh3Input.value);

const h2s=Number(h2sInput.value);

const tvoc=Number(tvocInput.value);

const pm=Number(pmInput.value);

const temp=Number(tempInput.value);

const hum=Number(humidityInput.value);

setCard(

co2Card,

getLevel(co2,limits.co2.safe,limits.co2.warning),

co2Status

);

setCard(

nh3Card,

getLevel(nh3,limits.nh3.safe,limits.nh3.warning),

nh3Status

);

setCard(

h2sCard,

getLevel(h2s,limits.h2s.safe,limits.h2s.warning),

h2sStatus

);

setCard(

tvocCard,

getLevel(tvoc,limits.tvoc.safe,limits.tvoc.warning),

tvocStatus

);

setCard(

pmCard,

getLevel(pm,limits.pm.safe,limits.pm.warning),

pmStatus

);

setCard(

tempCard,

getLevel(temp,limits.temp.safe,limits.temp.warning),

tempStatus

);

setCard(

humidityCard,

getLevel(hum,limits.humidity.safe,limits.humidity.warning),

humidityStatus

);

}

/*=========================================
HEALTH SCORE
=========================================*/

function updateHealth(){

let health=100;

if(co2Status.innerHTML=="WARNING") health-=8;
if(co2Status.innerHTML=="CRITICAL") health-=20;

if(nh3Status.innerHTML=="WARNING") health-=8;
if(nh3Status.innerHTML=="CRITICAL") health-=20;

if(h2sStatus.innerHTML=="WARNING") health-=8;
if(h2sStatus.innerHTML=="CRITICAL") health-=20;

if(tvocStatus.innerHTML=="WARNING") health-=6;
if(tvocStatus.innerHTML=="CRITICAL") health-=12;

if(pmStatus.innerHTML=="WARNING") health-=6;
if(pmStatus.innerHTML=="CRITICAL") health-=12;

if(tempStatus.innerHTML=="WARNING") health-=5;
if(tempStatus.innerHTML=="CRITICAL") health-=10;

if(humidityStatus.innerHTML=="WARNING") health-=5;
if(humidityStatus.innerHTML=="CRITICAL") health-=10;

if(health<0){

health=0;

}

healthScore.innerHTML=health+"%";

summaryHealth.innerHTML=health+"%";

overallHealth.innerHTML=health+"%";

aiHealthScore.innerHTML=health+"%";

}

/*=========================================
AI ENGINE
=========================================*/

function updateAI(){

let overall="SAFE";

let recommendation=

"Environment is healthy. Continue regular monitoring.";

let prediction=

"No environmental risk predicted.";

let alerts=0;

document.querySelectorAll(".sensor-card span").forEach(function(item){

if(item.innerHTML=="WARNING"){

overall="WARNING";

alerts++;

}

if(item.innerHTML=="CRITICAL"){

overall="CRITICAL";

alerts++;

}

});

overallStatus.innerHTML=overall;

summaryStatus.innerHTML=overall;

predictionValue.innerHTML=overall;

predictionLevel.innerHTML=overall;

summaryAlert.innerHTML=alerts;

alerts.innerHTML=alerts;

if(overall=="WARNING"){

recommendation=

"Increase ventilation. Inspect the surrounding area.";

prediction=

"Environmental quality may deteriorate within 30 minutes.";

}

if(overall=="CRITICAL"){

recommendation=

"Immediate action required. Restrict access and notify maintenance team.";

prediction=

"Hazardous conditions detected. Emergency response recommended.";

}

recommendationText.innerHTML=recommendation;

predictionMessage.innerHTML=prediction;

assessment.innerHTML=recommendation;

summaryPrediction.innerHTML=prediction;

}

/*=========================================
CONSOLE
=========================================*/

console.log(

"AI Decision Engine Loaded"

);
/*==================================================
SCRIPT.JS V3
PART 3
Live Chart
Gauge
SMS
Email
WhatsApp
==================================================*/

/*=========================================
LIVE CHART
=========================================*/

const chartCTX=document.getElementById("trendChart").getContext("2d");

const trendChart=new Chart(chartCTX,{

type:"line",

data:{

labels:[],

datasets:[

{

label:"CO₂",

data:[],

borderColor:"#00C853",

backgroundColor:"rgba(0,200,83,.15)",

fill:true,

tension:.4,

borderWidth:3

},

{

label:"NH₃",

data:[],

borderColor:"#FF9800",

backgroundColor:"rgba(255,152,0,.15)",

fill:true,

tension:.4,

borderWidth:3

},

{

label:"H₂S",

data:[],

borderColor:"#F44336",

backgroundColor:"rgba(244,67,54,.15)",

fill:true,

tension:.4,

borderWidth:3

}

]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

position:"top"

}

},

interaction:{

mode:"index",

intersect:false

},

scales:{

y:{

beginAtZero:true

}

}

}

});

/*=========================================
UPDATE CHART
=========================================*/

function updateChart(){

let time=new Date().toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit",

second:"2-digit"

});

trendChart.data.labels.push(time);

trendChart.data.datasets[0].data.push(Number(co2Input.value));

trendChart.data.datasets[1].data.push(Number(nh3Input.value));

trendChart.data.datasets[2].data.push(Number(h2sInput.value));

if(trendChart.data.labels.length>20){

trendChart.data.labels.shift();

trendChart.data.datasets[0].data.shift();

trendChart.data.datasets[1].data.shift();

trendChart.data.datasets[2].data.shift();

}

trendChart.update();

}

/*=========================================
CLEAR CHART
=========================================*/

document.getElementById("clearChart").onclick=function(){

trendChart.data.labels=[];

trendChart.data.datasets.forEach(function(ds){

ds.data=[];

});

trendChart.update();

};

/*=========================================
GAUGE UPDATE
=========================================*/

function updateGauge(){

co2GaugeValue.innerHTML=co2Input.value+" ppm";

nh3GaugeValue.innerHTML=nh3Input.value+" ppm";

h2sGaugeValue.innerHTML=h2sInput.value+" ppm";

}

/*=========================================
SMS
=========================================*/

function updateSMS(){

smsMessage.value=

`🚨 KatrU Lite Environmental Alert

Facility : ${facilityName.value}

Status : ${overallStatus.innerHTML}

CO₂ : ${co2Input.value} ppm

NH₃ : ${nh3Input.value} ppm

H₂S : ${h2sInput.value} ppm

Health Score : ${healthScore.innerHTML}

Recommendation

${recommendationText.innerHTML}

Generated

${new Date().toLocaleTimeString()}`;

}

/*=========================================
EMAIL
=========================================*/

function updateEmail(){

emailSubject.value=

overallStatus.innerHTML+

" Environmental Alert";

emailMessage.value=

`Dear Officer,

Facility

${facilityName.value}

Current Status

${overallStatus.innerHTML}

CO₂ : ${co2Input.value} ppm

NH₃ : ${nh3Input.value} ppm

H₂S : ${h2sInput.value} ppm

Health Score

${healthScore.innerHTML}

AI Recommendation

${recommendationText.innerHTML}

Generated Automatically by KatrU Lite AI Platform.`;

}

/*=========================================
WHATSAPP
=========================================*/

function updateWhatsApp(){

whatsappMessage.value=

`🚨 KATRU LITE

Facility : ${facilityName.value}

Status : ${overallStatus.innerHTML}

CO₂ : ${co2Input.value}

NH₃ : ${nh3Input.value}

H₂S : ${h2sInput.value}

Health : ${healthScore.innerHTML}

${recommendationText.innerHTML}`;

}

/*=========================================
ALERT HISTORY
=========================================*/

function updateAlertHistory(){

if(overallStatus.innerHTML=="SAFE") return;

let row=document.createElement("tr");

row.innerHTML=`

<td>${new Date().toLocaleTimeString()}</td>

<td>${facilityName.value}</td>

<td>Environmental</td>

<td>${overallStatus.innerHTML}</td>

<td>

<span class="${overallStatus.innerHTML=="CRITICAL"?"red-tag":"yellow-tag"}">

${overallStatus.innerHTML}

</span>

</td>

<td>

${recommendationText.innerHTML}

</td>

`;

alertHistory.prepend(row);

if(alertHistory.rows.length>15){

alertHistory.deleteRow(15);

}

}

/*=========================================
COPY BUTTONS
=========================================*/

copySMS.onclick=function(){

navigator.clipboard.writeText(smsMessage.value);

alert("SMS Copied");

};

copyEmail.onclick=function(){

navigator.clipboard.writeText(emailMessage.value);

alert("Email Copied");

};

copyWhatsApp.onclick=function(){

navigator.clipboard.writeText(whatsappMessage.value);

alert("WhatsApp Message Copied");

};

console.log("Chart + Notification Engine Loaded");
/*==================================================
SCRIPT.JS V3
PART 4
PDF
CSV
Dark Mode
Presentation
Auto Demo
==================================================*/

/*=========================================
PDF REPORT
=========================================*/

document.getElementById("pdfReport").onclick=function(){

const { jsPDF }=window.jspdf;

const pdf=new jsPDF();

pdf.setFontSize(22);

pdf.text("KatrU Lite Environmental Report",20,20);

pdf.setFontSize(12);

pdf.text("Facility : "+facilityName.value,20,40);

pdf.text("Status : "+overallStatus.innerHTML,20,50);

pdf.text("Health Score : "+healthScore.innerHTML,20,60);

pdf.text("CO₂ : "+co2Input.value+" ppm",20,80);

pdf.text("NH₃ : "+nh3Input.value+" ppm",20,90);

pdf.text("H₂S : "+h2sInput.value+" ppm",20,100);

pdf.text("TVOC : "+tvocInput.value+" ppb",20,110);

pdf.text("PM2.5 : "+pmInput.value+" ug/m3",20,120);

pdf.text("Temperature : "+tempInput.value+" °C",20,130);

pdf.text("Humidity : "+humidityInput.value+" %",20,140);

pdf.text("AI Recommendation",20,165);

pdf.text(recommendationText.innerHTML,20,175);

pdf.save("KatruLite_Report.pdf");

};

/*=========================================
CSV EXPORT
=========================================*/

document.getElementById("csvReport").onclick=function(){

let csv=

`Facility,Status,CO2,NH3,H2S,TVOC,PM2.5,Temperature,Humidity

${facilityName.value},

${overallStatus.innerHTML},

${co2Input.value},

${nh3Input.value},

${h2sInput.value},

${tvocInput.value},

${pmInput.value},

${tempInput.value},

${humidityInput.value}`;

const blob=new Blob([csv],{

type:"text/csv"

});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="KatruLite_Data.csv";

link.click();

};

/*=========================================
DARK MODE
=========================================*/

let dark=false;

toggleTheme.onclick=function(){

dark=!dark;

if(dark){

document.body.classList.add("dark");

this.innerHTML="☀ Light Mode";

}

else{

document.body.classList.remove("dark");

this.innerHTML="🌙 Dark Mode";

}

};

/*=========================================
FULL SCREEN
=========================================*/

fullscreen.onclick=function(){

if(!document.fullscreenElement){

document.documentElement.requestFullscreen();

}

else{

document.exitFullscreen();

}

};

/*=========================================
PRESENTATION MODE
=========================================*/

presentationMode.onclick=function(){

document.documentElement.requestFullscreen();

document.body.classList.add("presentation");

alert(

"Presentation Mode Enabled"

);

};

/*=========================================
AUTO DEMO
=========================================*/

let demoRunning=false;

let timer;

autoDemo.onclick=function(){

if(!demoRunning){

demoRunning=true;

this.innerHTML="Stop Demo";

timer=setInterval(function(){

co2Input.value=Math.floor(Math.random()*1300)+350;

nh3Input.value=Math.floor(Math.random()*65);

h2sInput.value=Math.floor(Math.random()*15);

tvocInput.value=Math.floor(Math.random()*650);

pmInput.value=Math.floor(Math.random()*90);

tempInput.value=Math.floor(Math.random()*18)+22;

humidityInput.value=Math.floor(Math.random()*45)+45;

updateDashboard();

},2500);

}

else{

demoRunning=false;

clearInterval(timer);

this.innerHTML="Auto Demo";

}

};

/*=========================================
REFRESH
=========================================*/

refreshDashboard.onclick=function(){

location.reload();

};

/*=========================================
DOWNLOAD DASHBOARD IMAGE
=========================================*/

downloadDashboard.onclick=function(){

html2canvas(document.body).then(function(canvas){

let link=document.createElement("a");

link.download="KatruLite_Dashboard.png";

link.href=canvas.toDataURL();

link.click();

});

};

/*=========================================
SHARE
=========================================*/

shareDashboard.onclick=function(){

navigator.clipboard.writeText(window.location.href);

alert("Dashboard Link Copied");

};

/*=========================================
SAVE SETTINGS
=========================================*/

function saveDashboard(){

const dashboard={

facility:facilityName.value,

co2:co2Input.value,

nh3:nh3Input.value,

h2s:h2sInput.value,

tvoc:tvocInput.value,

pm:pmInput.value,

temp:tempInput.value,

humidity:humidityInput.value

};

localStorage.setItem(

"KatruLiteDashboard",

JSON.stringify(dashboard)

);

}

/*=========================================
LOAD SETTINGS
=========================================*/

function loadDashboard(){

const data=

JSON.parse(

localStorage.getItem(

"KatruLiteDashboard"

)

);

if(data){

facilityName.value=data.facility;

co2Input.value=data.co2;

nh3Input.value=data.nh3;

h2sInput.value=data.h2s;

tvocInput.value=data.tvoc;

pmInput.value=data.pm;

tempInput.value=data.temp;

humidityInput.value=data.humidity;

updateDashboard();

}

}

window.addEventListener(

"beforeunload",

saveDashboard

);

window.addEventListener(

"load",

loadDashboard

);

/*=========================================
KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener("keydown",function(e){

if(e.key==="F5"){

e.preventDefault();

updateDashboard();

}

if(e.key==="F11"){

e.preventDefault();

fullscreen.click();

}

if(e.key==="Escape"){

document.body.classList.remove("presentation");

}

});

/*=========================================
SYSTEM MONITOR
=========================================*/

setInterval(function(){

document.getElementById("lastUpdated").innerHTML=

new Date().toLocaleTimeString();

},1000);

/*=========================================
READY
=========================================*/

console.clear();

console.log(

"%cKatrU Lite Enterprise Dashboard Ready",

"font-size:22px;color:#1565C0;font-weight:bold"

);

console.log(

"AI Environmental Monitoring Platform"

);

console.log(

"Developed by JWorks"

);
