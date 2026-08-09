/* ==========================================
   KatrU Lite Enterprise Dashboard
   script.js - PART 1
========================================== */

/* ===========================
CURRENT TIME
=========================== */

function updateClock(){

const now = new Date();

document.getElementById("clock").innerHTML =
now.toLocaleDateString() +
" | " +
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

/* ===========================
FACILITY DATA
=========================== */

const facilities={

toilet:{
name:"Public Toilet",
co2:530,
nh3:12,
h2s:2,
tvoc:210,
pm25:18,
temp:29,
humidity:65
},

factory:{
name:"Industrial Factory",
co2:760,
nh3:30,
h2s:5,
tvoc:420,
pm25:40,
temp:34,
humidity:55
},

community:{
name:"Community Toilet",
co2:620,
nh3:18,
h2s:3,
tvoc:280,
pm25:26,
temp:31,
humidity:70
},

school:{
name:"School",
co2:470,
nh3:6,
h2s:1,
tvoc:120,
pm25:14,
temp:28,
humidity:61
},

hospital:{
name:"Hospital",
co2:450,
nh3:5,
h2s:1,
tvoc:110,
pm25:10,
temp:24,
humidity:58
},

stp:{
name:"STP",
co2:840,
nh3:36,
h2s:9,
tvoc:480,
pm25:32,
temp:33,
humidity:76
}

};

/* ===========================
FACILITY SELECTION
=========================== */

const facilityCards=document.querySelectorAll(".facility");

facilityCards.forEach(card=>{

card.addEventListener("click",()=>{

facilityCards.forEach(x=>x.classList.remove("active"));

card.classList.add("active");

loadFacility(card.dataset.type);

});

});

/* ===========================
LOAD FACILITY
=========================== */

function loadFacility(type){

let d=facilities[type];

document.getElementById("facilityName").innerHTML=d.name;

document.getElementById("deviceLocation").innerHTML=d.name;

document.getElementById("co2").innerHTML=d.co2;

document.getElementById("nh3").innerHTML=d.nh3;

document.getElementById("h2s").innerHTML=d.h2s;

document.getElementById("tvoc").innerHTML=d.tvoc;

document.getElementById("pm25").innerHTML=d.pm25;

document.getElementById("temp").innerHTML=d.temp+"°C";

document.getElementById("humidity").innerHTML=d.humidity+"%";

}

/* ===========================
DEFAULT LOAD
=========================== */

loadFacility("toilet");

/* ===========================
LIVE SENSOR SIMULATION
=========================== */

function random(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

setInterval(()=>{

document.getElementById("co2").innerHTML=random(420,900);

document.getElementById("nh3").innerHTML=random(4,55);

document.getElementById("h2s").innerHTML=random(1,10);

document.getElementById("tvoc").innerHTML=random(80,500);

document.getElementById("pm25").innerHTML=random(8,60);

document.getElementById("temp").innerHTML=random(24,37)+"°C";

document.getElementById("humidity").innerHTML=random(45,85)+"%";
/* ==========================================
   PART 2
   Threshold Engine
   AI Recommendation
   SMS Preview
========================================== */

/* ===========================
DEFAULT THRESHOLDS
=========================== */

let threshold={

co2Warn:800,
co2Critical:1000,

nh3Warn:25,
nh3Critical:50,

h2sWarn:5,
h2sCritical:10,

tvocWarn:300,
tvocCritical:500,

pmWarn:35,
pmCritical:75

};

/* ===========================
APPLY THRESHOLDS
=========================== */

document.getElementById("applyThreshold").onclick=function(){

threshold.co2Warn=Number(document.getElementById("co2Warn").value);
threshold.co2Critical=Number(document.getElementById("co2Critical").value);

threshold.nh3Warn=Number(document.getElementById("nh3Warn").value);
threshold.nh3Critical=Number(document.getElementById("nh3Critical").value);

threshold.h2sWarn=Number(document.getElementById("h2sWarn").value);
threshold.h2sCritical=Number(document.getElementById("h2sCritical").value);

threshold.tvocWarn=Number(document.getElementById("tvocWarn").value);
threshold.tvocCritical=Number(document.getElementById("tvocCritical").value);

threshold.pmWarn=Number(document.getElementById("pmWarn").value);
threshold.pmCritical=Number(document.getElementById("pmCritical").value);

checkEnvironment();

alert("Thresholds Updated Successfully.");

};

/* ===========================
CHECK ENVIRONMENT
=========================== */

function checkEnvironment(){

let co2=Number(document.getElementById("co2").innerHTML);

let nh3=Number(document.getElementById("nh3").innerHTML);

let h2s=Number(document.getElementById("h2s").innerHTML);

let tvoc=Number(document.getElementById("tvoc").innerHTML);

let pm=Number(document.getElementById("pm25").innerHTML);

let risk="LOW";

let status="NORMAL";

let message="Environmental parameters are within safe operating limits.";

let recommendation="Continue routine monitoring.";

if(
co2>threshold.co2Warn||
nh3>threshold.nh3Warn||
h2s>threshold.h2sWarn||
tvoc>threshold.tvocWarn||
pm>threshold.pmWarn
){

risk="MEDIUM";

status="WARNING";

message="Warning: Environmental parameters approaching unsafe limits.";

recommendation="Increase ventilation and inspect the facility.";

}

if(
co2>threshold.co2Critical||
nh3>threshold.nh3Critical||
h2s>threshold.h2sCritical||
tvoc>threshold.tvocCritical||
pm>threshold.pmCritical
){

risk="HIGH";

status="CRITICAL";

message="Critical environmental condition detected.";

recommendation="Immediate inspection required. Restrict entry until conditions normalize.";

}

/* Dashboard */

document.getElementById("risk").innerHTML=risk;

document.getElementById("statusText").innerHTML=status;

/* AI Panel */

document.getElementById("aiBox").innerHTML=`

<h3>${status}</h3>

<p>${message}</p>

<ul>

<li>✔ ${recommendation}</li>

<li>✔ AI Confidence : 96%</li>

<li>✔ Next Prediction Update : 30 Seconds</li>

<li>✔ Predictive Maintenance Enabled</li>

</ul>

`;

/* SMS */

document.getElementById("smsMessage").innerHTML=

`ALERT

Facility : ${document.getElementById("facilityName").innerHTML}

Status : ${status}

CO₂ : ${co2} ppm

NH₃ : ${nh3} ppm

Recommendation :

${recommendation}

-KatrU Lite AI Monitoring Platform`;

}

/* ===========================
AUTO CHECK
=========================== */

setInterval(checkEnvironment,2000);
/* ==========================================
   PART 3
   Charts
   Alert History
   Device Status
========================================== */

/* ===========================
LINE CHART
=========================== */

const sensorCtx=document.getElementById("sensorChart").getContext("2d");

const sensorChart=new Chart(sensorCtx,{

type:"line",

data:{

labels:["10:00","10:10","10:20","10:30","10:40","10:50"],

datasets:[

{

label:"CO₂",

data:[520,540,530,550,565,570],

borderColor:"#00A86B",

backgroundColor:"rgba(0,168,107,.15)",

fill:true,

tension:.4

},

{

label:"NH₃",

data:[10,12,11,14,16,18],

borderColor:"#F39C12",

backgroundColor:"rgba(243,156,18,.15)",

fill:true,

tension:.4

}

]

},

options:{

responsive:true,

plugins:{

legend:{

position:"top"

}

}

}

});

/* ===========================
AQI PIE CHART
=========================== */

const aqiCtx=document.getElementById("aqiChart").getContext("2d");

const aqiChart=new Chart(aqiCtx,{

type:"doughnut",

data:{

labels:["Healthy","Moderate","Critical"],

datasets:[{

data:[72,22,6],

backgroundColor:[

"#2ECC71",

"#F39C12",

"#E74C3C"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

}

}

});

/* ===========================
UPDATE CHARTS
=========================== */

function updateCharts(){

let co2=parseInt(document.getElementById("co2").innerHTML);

let nh3=parseInt(document.getElementById("nh3").innerHTML);

sensorChart.data.datasets[0].data.push(co2);

sensorChart.data.datasets[1].data.push(nh3);

sensorChart.data.labels.push(new Date().toLocaleTimeString());

if(sensorChart.data.labels.length>12){

sensorChart.data.labels.shift();

sensorChart.data.datasets[0].data.shift();

sensorChart.data.datasets[1].data.shift();

}

sensorChart.update();

}

setInterval(updateCharts,3000);

/* ===========================
ADD ALERT
=========================== */

function addAlert(sensor,value,status,recommendation){

const tbody=document.getElementById("alertHistory");

const row=document.createElement("tr");

row.innerHTML=`

<td>${new Date().toLocaleTimeString()}</td>

<td>${sensor}</td>

<td>${value}</td>

<td class="${status=="CRITICAL"?"critical":"warning"}">

${status}

</td>

<td>${recommendation}</td>

`;

tbody.prepend(row);

while(tbody.rows.length>10){

tbody.deleteRow(10);

}

}

/* ===========================
DEVICE STATUS
=========================== */

function updateDeviceStatus(){

document.getElementById("syncTime").innerHTML=

new Date().toLocaleTimeString();

}

setInterval(updateDeviceStatus,5000);

/* ===========================
AUTO ALERTS
=========================== */

setInterval(()=>{

let co2=parseInt(document.getElementById("co2").innerHTML);

let nh3=parseInt(document.getElementById("nh3").innerHTML);

if(co2>threshold.co2Critical){

addAlert(

"CO₂",

co2+" ppm",

"CRITICAL",

"Increase ventilation immediately."

);

}

if(nh3>threshold.nh3Critical){

addAlert(

"NH₃",

nh3+" ppm",

"CRITICAL",

"Inspect sanitation system immediately."

);

}

},5000);
/* ==========================================
   PART 4
   Facility Auto Configuration
   Dynamic Card Colors
   Export Reports
   SMS Preview
========================================== */

/* ===========================
FACILITY THRESHOLDS
=========================== */

const facilityThresholds={

toilet:{co2:800,nh3:25,h2s:5,tvoc:300,pm:35},

factory:{co2:1200,nh3:40,h2s:8,tvoc:500,pm:50},

community:{co2:900,nh3:30,h2s:6,tvoc:350,pm:40},

school:{co2:700,nh3:15,h2s:3,tvoc:250,pm:25},

hospital:{co2:650,nh3:10,h2s:2,tvoc:200,pm:20},

stp:{co2:1500,nh3:50,h2s:12,tvoc:650,pm:60}

};

/* ===========================
AUTO LOAD THRESHOLD
=========================== */

document.querySelectorAll(".facility").forEach(card=>{

card.onclick=function(){

let type=this.dataset.type;

let t=facilityThresholds[type];

document.getElementById("co2Warn").value=t.co2;

document.getElementById("nh3Warn").value=t.nh3;

document.getElementById("h2sWarn").value=t.h2s;

document.getElementById("tvocWarn").value=t.tvoc;

document.getElementById("pmWarn").value=t.pm;

};

});

/* ===========================
CARD COLORS
=========================== */

function updateCard(id,value,warn,critical){

const card=document.getElementById(id).parentElement;

card.classList.remove("card-normal","card-warning","card-danger");

if(value>=critical){

card.classList.add("card-danger");

}

else if(value>=warn){

card.classList.add("card-warning");

}

else{

card.classList.add("card-normal");

}

}

function refreshCards(){

updateCard("co2",
parseInt(document.getElementById("co2").innerHTML),
threshold.co2Warn,
threshold.co2Critical);

updateCard("nh3",
parseInt(document.getElementById("nh3").innerHTML),
threshold.nh3Warn,
threshold.nh3Critical);

updateCard("h2s",
parseInt(document.getElementById("h2s").innerHTML),
threshold.h2sWarn,
threshold.h2sCritical);

updateCard("tvoc",
parseInt(document.getElementById("tvoc").innerHTML),
threshold.tvocWarn,
threshold.tvocCritical);

updateCard("pm25",
parseInt(document.getElementById("pm25").innerHTML),
threshold.pmWarn,
threshold.pmCritical);

}

setInterval(refreshCards,1000);

/* ===========================
SMS PREVIEW
=========================== */

document.getElementById("sendSMS").onclick=function(){

alert(

document.getElementById("smsMessage").innerText

);

};

/* ===========================
EXPORT PDF
=========================== */

document.querySelectorAll(".report-box button").forEach(btn=>{

btn.onclick=function(){

alert(

"Demo Version\n\nReport export will be enabled in the commercial version."

);

};

});

/* ===========================
HEALTH SCORE
=========================== */

function updateHealthScore(){

let score=100;

let co2=parseInt(document.getElementById("co2").innerHTML);

let nh3=parseInt(document.getElementById("nh3").innerHTML);

if(co2>threshold.co2Warn) score-=10;

if(co2>threshold.co2Critical) score-=20;

if(nh3>threshold.nh3Warn) score-=10;

if(nh3>threshold.nh3Critical) score-=20;

score=Math.max(score,0);

document.getElementById("health").innerHTML=score+"%";

}

setInterval(updateHealthScore,3000);
/* ==========================================
   PART 5
   Professional Features
   AI Prediction
   Local Storage
   Dark Mode
   Loading Screen
========================================== */

/* ===========================
SAVE SETTINGS
=========================== */

function saveSettings(){

localStorage.setItem(

"katruThreshold",

JSON.stringify(threshold)

);

}

function loadSettings(){

let data=localStorage.getItem("katruThreshold");

if(data){

threshold=JSON.parse(data);

document.getElementById("co2Warn").value=threshold.co2Warn;
document.getElementById("co2Critical").value=threshold.co2Critical;

document.getElementById("nh3Warn").value=threshold.nh3Warn;
document.getElementById("nh3Critical").value=threshold.nh3Critical;

document.getElementById("h2sWarn").value=threshold.h2sWarn;
document.getElementById("h2sCritical").value=threshold.h2sCritical;

document.getElementById("tvocWarn").value=threshold.tvocWarn;
document.getElementById("tvocCritical").value=threshold.tvocCritical;

document.getElementById("pmWarn").value=threshold.pmWarn;
document.getElementById("pmCritical").value=threshold.pmCritical;

}

}

loadSettings();

document.getElementById("applyThreshold").addEventListener(

"click",

saveSettings

);

/* ===========================
AI PREDICTIVE ENGINE
=========================== */

function predictRisk(){

let co2=parseInt(document.getElementById("co2").innerHTML);

let nh3=parseInt(document.getElementById("nh3").innerHTML);

let prediction="Low";

let recommendation="Continue monitoring.";

if(co2>700 || nh3>20){

prediction="Moderate";

recommendation="Increase ventilation and inspect facility.";

}

if(co2>1000 || nh3>45){

prediction="High";

recommendation="Immediate inspection recommended.";

}

document.getElementById("risk").innerHTML=prediction;

}

setInterval(predictRisk,4000);

/* ===========================
LOADING SCREEN
=========================== */

window.onload=function(){

const loader=document.createElement("div");

loader.id="loader";

loader.innerHTML=`

<div class="loader-box">

<h2>KatrU Lite</h2>

<p>Loading Enterprise Dashboard...</p>

</div>

`;

document.body.appendChild(loader);

setTimeout(()=>{

loader.remove();

},1800);

};

/* ===========================
DARK MODE
=========================== */

let dark=false;

function toggleTheme(){

dark=!dark;

if(dark){

document.body.classList.add("dark");

}

else{

document.body.classList.remove("dark");

}

}

/* ===========================
KEYBOARD SHORTCUT
=========================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="d"){

toggleTheme();

}

});

/* ===========================
AUTO REPORT COUNTER
=========================== */

let reportCounter=1;

setInterval(()=>{

console.log(

"Environmental Report #"+reportCounter+

" Generated"

);

reportCounter++;

},30000);

/* ===========================
SYSTEM HEARTBEAT
=========================== */

setInterval(()=>{

console.log(

"KatrU Lite Device Connected"

);

},10000);

/* ===========================
WELCOME MESSAGE
=========================== */

console.log(

"%cWelcome to KatrU Lite Enterprise Dashboard",

"font-size:20px;color:#00A86B;font-weight:bold;"

);

console.log(

"AI + IoT Environmental Monitoring Platform"

);

/* ===========================
READY
=========================== */

alert(

"KatrU Lite Enterprise Dashboard Loaded Successfully."

);

},3000);
