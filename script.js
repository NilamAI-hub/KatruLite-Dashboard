/*==================================================
KATRU LITE DASHBOARD V2
script.js PART 1
Core Dashboard Engine
==================================================*/

/*==================================
LIVE CLOCK
==================================*/

function updateClock(){

const now=new Date();

const options={

hour:'2-digit',

minute:'2-digit',

second:'2-digit'

};

document.getElementById("clock").innerHTML=

now.toLocaleTimeString('en-US',options);

}

setInterval(updateClock,1000);

updateClock();

/*==================================
FACILITY DATABASE
==================================*/

const facilityData={

toilet:{

name:"Public Toilet",

health:96,

aqi:"GOOD",

co2:520,

nh3:12,

h2s:2,

tvoc:210,

pm:18,

temp:29,

humidity:64

},

community:{

name:"Community Toilet",

health:92,

aqi:"GOOD",

co2:610,

nh3:16,

h2s:3,

tvoc:240,

pm:22,

temp:30,

humidity:68

},

factory:{

name:"Industrial Factory",

health:80,

aqi:"MODERATE",

co2:890,

nh3:28,

h2s:6,

tvoc:420,

pm:42,

temp:34,

humidity:58

},

school:{

name:"School",

health:98,

aqi:"GOOD",

co2:470,

nh3:5,

h2s:1,

tvoc:110,

pm:12,

temp:27,

humidity:60

},

hospital:{

name:"Hospital",

health:99,

aqi:"GOOD",

co2:430,

nh3:4,

h2s:1,

tvoc:95,

pm:10,

temp:24,

humidity:56

},

stp:{

name:"STP",

health:72,

aqi:"POOR",

co2:980,

nh3:42,

h2s:8,

tvoc:520,

pm:54,

temp:33,

humidity:76

}

};

/*==================================
LOAD FACILITY
==================================*/

function loadFacility(type){

let d=facilityData[type];

document.getElementById("facilityName").value=d.name;

document.getElementById("deviceLocation").innerHTML=d.name;

document.getElementById("healthScore").innerHTML=d.health+"%";

document.getElementById("healthFill").style.width=d.health+"%";

document.getElementById("healthFill").innerHTML=d.health+"%";

document.getElementById("aqi").innerHTML=d.aqi;

document.getElementById("co2Value").innerHTML=d.co2;

document.getElementById("nh3Value").innerHTML=d.nh3;

document.getElementById("h2sValue").innerHTML=d.h2s;

document.getElementById("tvocValue").innerHTML=d.tvoc;

document.getElementById("pmValue").innerHTML=d.pm;

document.getElementById("tempValue").innerHTML=d.temp+"°C";

document.getElementById("humidityValue").innerHTML=d.humidity+"%";

}

/*==================================
FACILITY CLICK
==================================*/

document.querySelectorAll(".facility").forEach(card=>{

card.addEventListener("click",function(){

document.querySelectorAll(".facility").forEach(c=>{

c.classList.remove("active");

});

this.classList.add("active");

loadFacility(this.dataset.type);

});

});

/*==================================
DEFAULT LOAD
==================================*/

loadFacility("toilet");

/*==================================
LIVE SENSOR SIMULATION
==================================*/

function rand(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

setInterval(()=>{

document.getElementById("co2Value").innerHTML=rand(450,950);

document.getElementById("nh3Value").innerHTML=rand(4,45);

document.getElementById("h2sValue").innerHTML=rand(1,9);

document.getElementById("tvocValue").innerHTML=rand(80,520);

document.getElementById("pmValue").innerHTML=rand(10,60);

document.getElementById("tempValue").innerHTML=rand(24,36)+"°C";

document.getElementById("humidityValue").innerHTML=rand(50,82)+"%";

},2500);
/*==================================================
SCRIPT.JS PART 2
Demo Mode
AI Engine
Threshold Engine
==================================================*/

/*==================================
DEFAULT THRESHOLDS
==================================*/

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
pmCritical:75,

tempWarn:35,
tempCritical:40,

humWarn:75,
humCritical:90

};

/*==================================
LOAD THRESHOLD VALUES
==================================*/

function loadThresholds(){

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

document.getElementById("tempWarn").value=threshold.tempWarn;
document.getElementById("tempCritical").value=threshold.tempCritical;

document.getElementById("humWarn").value=threshold.humWarn;
document.getElementById("humCritical").value=threshold.humCritical;

}

loadThresholds();

/*==================================
SAVE SETTINGS
==================================*/

document.getElementById("applySettings").onclick=function(){

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

threshold.tempWarn=Number(document.getElementById("tempWarn").value);
threshold.tempCritical=Number(document.getElementById("tempCritical").value);

threshold.humWarn=Number(document.getElementById("humWarn").value);
threshold.humCritical=Number(document.getElementById("humCritical").value);

alert("Thresholds Updated Successfully.");

};

/*==================================
AI ENGINE
==================================*/

function updateAI(){

let co2=parseInt(document.getElementById("co2Value").innerHTML);

let nh3=parseInt(document.getElementById("nh3Value").innerHTML);

let h2s=parseInt(document.getElementById("h2sValue").innerHTML);

let status="SAFE";

let color="#2ECC71";

let health=96;

let recommendation="Continue Routine Monitoring.";

if(
co2>threshold.co2Warn||
nh3>threshold.nh3Warn||
h2s>threshold.h2sWarn
){

status="WARNING";

color="#F39C12";

health=82;

recommendation="Increase ventilation and inspect the facility.";

}

if(
co2>threshold.co2Critical||
nh3>threshold.nh3Critical||
h2s>threshold.h2sCritical
){

status="CRITICAL";

color="#E74C3C";

health=58;

recommendation="Immediate inspection required. Restrict access until environmental conditions improve.";

}

document.getElementById("predictionValue").innerHTML=status;

document.getElementById("predictionText").innerHTML=status;

document.getElementById("healthScore").innerHTML=health+"%";

document.getElementById("healthFill").style.width=health+"%";

document.getElementById("healthFill").innerHTML=health+"%";

document.getElementById("assessment").innerHTML=recommendation;

document.getElementById("riskScore").innerHTML=status;

document.getElementById("riskStatus").innerHTML=status;

document.getElementById("aiScore").innerHTML=health+"%";

document.getElementById("rec1").innerHTML=recommendation;

}

/*==================================
AUTO AI UPDATE
==================================*/

setInterval(updateAI,2000);

/*==================================
DEMO BUTTONS
==================================*/

document.querySelector(".normal").onclick=function(){

document.getElementById("co2Value").innerHTML=520;
document.getElementById("nh3Value").innerHTML=12;
document.getElementById("h2sValue").innerHTML=2;

updateAI();

};

document.querySelector(".warning").onclick=function(){

document.getElementById("co2Value").innerHTML=850;
document.getElementById("nh3Value").innerHTML=32;
document.getElementById("h2sValue").innerHTML=6;

updateAI();

};

document.querySelector(".critical").onclick=function(){

document.getElementById("co2Value").innerHTML=1250;
document.getElementById("nh3Value").innerHTML=58;
document.getElementById("h2sValue").innerHTML=12;

updateAI();

};

document.querySelector(".custom").onclick=function(){

alert("Custom Demo Mode Enabled");

};
/*==================================================
SCRIPT.JS PART 3
Professional Charts
==================================================*/

/* ================================
CHART INITIALIZATION
================================ */

const trendCtx = document.getElementById("trendChart").getContext("2d");

const trendChart = new Chart(trendCtx,{

type:"line",

data:{

labels:["10:00","10:05","10:10","10:15","10:20","10:25"],

datasets:[

{

label:"CO₂ (ppm)",

data:[520,530,545,560,550,570],

borderColor:"#00B050",

backgroundColor:"rgba(0,176,80,0.15)",

borderWidth:3,

fill:true,

tension:.4

},

{

label:"NH₃ (ppm)",

data:[10,11,12,13,14,15],

borderColor:"#F39C12",

backgroundColor:"rgba(243,156,18,.15)",

borderWidth:3,

fill:true,

tension:.4

}

]

},

options:{

responsive:true,

maintainAspectRatio:false,

interaction:{

mode:'index',

intersect:false

},

plugins:{

legend:{

position:'top'

},

title:{

display:true,

text:'Live Environmental Analysis'

}

},

scales:{

y:{

beginAtZero:true

}

}

}

});

/* ================================
LIVE CHART UPDATE
================================ */

function updateLiveChart(){

const time=new Date().toLocaleTimeString([],{

hour:'2-digit',

minute:'2-digit'

});

const co2=parseInt(document.getElementById("co2Value").innerHTML);

const nh3=parseInt(document.getElementById("nh3Value").innerHTML);

trendChart.data.labels.push(time);

trendChart.data.datasets[0].data.push(co2);

trendChart.data.datasets[1].data.push(nh3);

if(trendChart.data.labels.length>12){

trendChart.data.labels.shift();

trendChart.data.datasets[0].data.shift();

trendChart.data.datasets[1].data.shift();

}

trendChart.update();

}

setInterval(updateLiveChart,3000);

/* ================================
GAUGES
================================ */

function gauge(id,color,value){

return new Chart(

document.getElementById(id),

{

type:"doughnut",

data:{

labels:["Value","Remaining"],

datasets:[{

data:[value,100-value],

backgroundColor:[color,"#E5E7EB"],

borderWidth:0

}]

},

options:{

cutout:"78%",

plugins:{

legend:{display:false},

tooltip:{enabled:false}

}

}

}

);

}

const co2Gauge=gauge("co2Gauge","#00B050",60);

const nh3Gauge=gauge("nh3Gauge","#F39C12",25);

const h2sGauge=gauge("h2sGauge","#E74C3C",15);

const aqiGauge=gauge("aqiGauge","#1565C0",92);

/* ================================
UPDATE GAUGES
================================ */

function updateGaugeValues(){

const co2=parseInt(document.getElementById("co2Value").innerHTML);

const nh3=parseInt(document.getElementById("nh3Value").innerHTML);

const h2s=parseInt(document.getElementById("h2sValue").innerHTML);

let health=parseInt(document.getElementById("healthScore").innerHTML);

co2Gauge.data.datasets[0].data=[Math.min(co2/15,100),100-Math.min(co2/15,100)];

nh3Gauge.data.datasets[0].data=[Math.min(nh3*2,100),100-Math.min(nh3*2,100)];

h2sGauge.data.datasets[0].data=[Math.min(h2s*8,100),100-Math.min(h2s*8,100)];

aqiGauge.data.datasets[0].data=[health,100-health];

co2Gauge.update();

nh3Gauge.update();

h2sGauge.update();

aqiGauge.update();

}

setInterval(updateGaugeValues,2500);

/* ================================
SMS UPDATE
================================ */

function updateSMS(){

document.getElementById("smsMessage").value=

`KatrU Lite ALERT

Facility : ${document.getElementById("facilityName").value}

Status : ${document.getElementById("predictionValue").innerHTML}

CO₂ : ${document.getElementById("co2Value").innerHTML} ppm

NH₃ : ${document.getElementById("nh3Value").innerHTML} ppm

H₂S : ${document.getElementById("h2sValue").innerHTML} ppm

Health Score : ${document.getElementById("healthScore").innerHTML}

Generated : ${new Date().toLocaleTimeString()}`;

}

setInterval(updateSMS,3000);

/* ================================
ALERT HISTORY
================================ */

function addAlert(){

const table=document.getElementById("alertHistory");

const row=table.insertRow(0);

row.innerHTML=`

<td>${new Date().toLocaleTimeString()}</td>

<td>${document.getElementById("facilityName").value}</td>

<td>CO₂</td>

<td>${document.getElementById("co2Value").innerHTML} ppm</td>

<td><span class="warning-badge">Updated</span></td>

<td>AI analysis completed</td>

`;

if(table.rows.length>10){

table.deleteRow(10);

}

}

setInterval(addAlert,15000);

/* ================================
COPY SMS
================================ */

document.getElementById("copySMS").onclick=function(){

navigator.clipboard.writeText(

document.getElementById("smsMessage").value

);

alert("SMS copied successfully.");

};

/* ================================
SMS PREVIEW
================================ */

document.getElementById("previewSMS").onclick=function(){

alert(document.getElementById("smsMessage").value);

};

console.log("Charts Loaded Successfully");
/*==================================================
SCRIPT.JS PART 4
Reports
Dark Mode
Auto Demo
Device Health
Dashboard Actions
==================================================*/

/*==================================
AUTO DEMO
==================================*/

document.getElementById("startDemo").onclick=function(){

normalDemo();

setTimeout(warningDemo,10000);

setTimeout(criticalDemo,20000);

setTimeout(normalDemo,30000);

};

function normalDemo(){

document.querySelector(".normal").click();

}

function warningDemo(){

document.querySelector(".warning").click();

}

function criticalDemo(){

document.querySelector(".critical").click();

}

/*==================================
DEVICE HEALTH
==================================*/

function updateDeviceHealth(){

let cpu=Math.floor(Math.random()*35)+20;

let memory=Math.floor(Math.random()*30)+40;

let storage=Math.floor(Math.random()*20)+15;

document.querySelectorAll(".progress-fill")[0].style.width=cpu+"%";

document.querySelectorAll(".progress-fill")[0].innerHTML=cpu+"%";

document.querySelectorAll(".progress-fill")[1].style.width=memory+"%";

document.querySelectorAll(".progress-fill")[1].innerHTML=memory+"%";

document.querySelectorAll(".progress-fill")[2].style.width=storage+"%";

document.querySelectorAll(".progress-fill")[2].innerHTML=storage+"%";

document.getElementById("lastSync").innerHTML=

new Date().toLocaleTimeString();

}

setInterval(updateDeviceHealth,5000);

/*==================================
REPORT BUTTONS
==================================*/

document.getElementById("pdfReport").onclick=function(){

alert("Generating Environmental PDF Report...");

};

document.getElementById("excelReport").onclick=function(){

alert("Exporting Excel File...");

};

document.getElementById("csvReport").onclick=function(){

alert("Downloading CSV Data...");

};

document.getElementById("analytics").onclick=function(){

alert("Opening Analytics Dashboard...");

};

/*==================================
QUICK ACTIONS
==================================*/

document.getElementById("refreshDashboard").onclick=function(){

location.reload();

};

document.getElementById("downloadReport").onclick=function(){

alert("Environmental Report Download Started.");

};

document.getElementById("shareDashboard").onclick=function(){

navigator.clipboard.writeText(window.location.href);

alert("Dashboard Link Copied.");

};

document.getElementById("systemLogs").onclick=function(){

alert("System running normally.\nNo critical logs.");

};

/*==================================
DARK MODE
==================================*/

let dark=false;

document.getElementById("toggleTheme").onclick=function(){

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

/*==================================
KEYBOARD SHORTCUTS
==================================*/

document.addEventListener("keydown",function(e){

if(e.key==="1"){

normalDemo();

}

if(e.key==="2"){

warningDemo();

}

if(e.key==="3"){

criticalDemo();

}

if(e.key==="d"){

document.getElementById("toggleTheme").click();

}

});

/*==================================
SAVE SETTINGS
==================================*/

function saveDashboard(){

localStorage.setItem(

"KatrULiteThreshold",

JSON.stringify(threshold)

);

}

function loadDashboard(){

let data=

localStorage.getItem(

"KatrULiteThreshold"

);

if(data){

threshold=JSON.parse(data);

loadThresholds();

}

}

document.getElementById("applySettings").addEventListener(

"click",

saveDashboard

);

loadDashboard();

/*==================================
SYSTEM STATUS
==================================*/

setInterval(function(){

console.log(

"KatrU Lite Dashboard Running..."

);

},10000);

/*==================================
WELCOME
==================================*/

console.clear();

console.log(

"%cKatrU Lite V2",

"font-size:28px;color:#1565C0;font-weight:bold"

);

console.log(

"AI + IoT Environmental Monitoring Platform"

);

console.log(

"Prototype Status : TRL-4"

);

console.log(

"Developed by JWorks"

);
/*==================================================
SCRIPT.JS PART 5
Enterprise AI
Presentation Mode
Notifications
Final Dashboard Engine
==================================================*/

/*==================================
LIVE NOTIFICATION
==================================*/

function showNotification(title,message,color="#1565C0"){

const notify=document.createElement("div");

notify.className="notification";

notify.style.background=color;

notify.innerHTML=`

<h4>${title}</h4>

<p>${message}</p>

`;

document.body.appendChild(notify);

setTimeout(()=>{

notify.style.right="20px";

},100);

setTimeout(()=>{

notify.style.right="-420px";

},4500);

setTimeout(()=>{

notify.remove();

},5200);

}

/*==================================
PRESENTATION MODE
==================================*/

document.getElementById("startDemo").addEventListener("click",()=>{

showNotification(

"Presentation Mode",

"Running KatrU Lite Live Demo"

);

});

/*==================================
AI FORECAST
==================================*/

function aiForecast(){

let co2=parseInt(document.getElementById("co2Value").innerHTML);

let nh3=parseInt(document.getElementById("nh3Value").innerHTML);

let h2s=parseInt(document.getElementById("h2sValue").innerHTML);

let msg="Environment Stable";

if(co2>800){

msg="CO₂ expected to increase in the next 20 minutes.";

}

if(nh3>30){

msg="NH₃ concentration may exceed safe limits.";

}

if(h2s>6){

msg="Hydrogen Sulphide risk detected.";

}

document.getElementById("predictionText").innerHTML=msg;

}

setInterval(aiForecast,5000);

/*==================================
SYSTEM UPTIME
==================================*/

let seconds=0;

setInterval(()=>{

seconds++;

let hrs=Math.floor(seconds/3600);

let mins=Math.floor((seconds%3600)/60);

let sec=seconds%60;

console.log(

"System Uptime : "+

hrs+"h "+mins+"m "+sec+"s"

);

},1000);

/*==================================
HEALTH COLOR
==================================*/

function updateHealthColor(){

let health=parseInt(

document.getElementById("healthScore").innerHTML

);

let bar=document.getElementById("healthFill");

if(health>=90){

bar.style.background="#2ECC71";

}

else if(health>=70){

bar.style.background="#F39C12";

}

else{

bar.style.background="#E74C3C";

}

}

setInterval(updateHealthColor,1000);

/*==================================
AUTO SAVE
==================================*/

setInterval(()=>{

localStorage.setItem(

"KatrULiteDashboard",

JSON.stringify({

co2:document.getElementById("co2Value").innerHTML,

nh3:document.getElementById("nh3Value").innerHTML,

h2s:document.getElementById("h2sValue").innerHTML,

health:document.getElementById("healthScore").innerHTML,

time:new Date().toLocaleString()

})

);

},10000);

/*==================================
LOAD LAST SESSION
==================================*/

window.onload=function(){

let data=

localStorage.getItem("KatrULiteDashboard");

if(data){

console.log("Previous session restored.");

}

showNotification(

"KatrU Lite",

"Enterprise Dashboard Loaded Successfully",

"#2ECC71"

);

};

/*==================================
FULL SCREEN MODE
==================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="F11"){

document.documentElement.requestFullscreen();

}

});

/*==================================
RANDOM AI INSIGHTS
==================================*/

const insights=[

"Air quality is within acceptable limits.",

"Schedule preventive maintenance this week.",

"Ventilation performance is optimal.",

"Sensor calibration recommended after 30 days.",

"No abnormal environmental trend detected.",

"Historical analysis indicates stable conditions."

];

setInterval(()=>{

let r=Math.floor(Math.random()*insights.length);

document.getElementById("assessment").innerHTML=

insights[r];

},7000);

/*==================================
LIVE STATUS
==================================*/

setInterval(()=>{

document.getElementById("alerts").innerHTML=

Math.floor(Math.random()*4);

},8000);

/*==================================
LOADING COMPLETE
==================================*/

console.log(

"%cKatrU Lite Enterprise Dashboard Ready",

"color:#2ECC71;font-size:22px;font-weight:bold"

);

showNotification(

"System Ready",

"AI + IoT Monitoring Platform Online",

"#1565C0"

);

/*==================================
END OF SCRIPT
==================================================*/
