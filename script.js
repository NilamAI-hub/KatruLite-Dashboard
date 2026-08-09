/*==================================================
KATRU LITE V2
SCRIPT.JS
PART 1
Core Engine
==================================================*/

/* -----------------------------
Live Clock
----------------------------- */

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();


/* -----------------------------
Current Facility
----------------------------- */

let currentFacility = "Public Toilet";


/* -----------------------------
Facility Selection
----------------------------- */

document.querySelectorAll(".facility-card").forEach(card=>{

    card.addEventListener("click",function(){

        document.querySelectorAll(".facility-card")
        .forEach(c=>c.classList.remove("active"));

        this.classList.add("active");

        currentFacility=this.dataset.facility;

        document.getElementById("facilityName").value=currentFacility;

        document.getElementById("deviceLocation").innerHTML=currentFacility;

        updateDashboard();

    });

});


/* -----------------------------
Sensor Inputs
----------------------------- */

const sensorInputs=[

"co2Input",
"nh3Input",
"h2sInput",
"tvocInput",
"pmInput",
"tempInput",
"humidityInput"

];

sensorInputs.forEach(id=>{

document.getElementById(id).addEventListener(

"input",

updateDashboard

);

});


/* -----------------------------
Simulation Buttons
----------------------------- */

document.getElementById("normalMode").onclick=function(){

co2Input.value=520;
nh3Input.value=12;
h2sInput.value=2;
tvocInput.value=180;
pmInput.value=18;
tempInput.value=29;
humidityInput.value=64;

updateDashboard();

};

document.getElementById("warningMode").onclick=function(){

co2Input.value=900;
nh3Input.value=35;
h2sInput.value=7;
tvocInput.value=420;
pmInput.value=55;
tempInput.value=37;
humidityInput.value=82;

updateDashboard();

};

document.getElementById("criticalMode").onclick=function(){

co2Input.value=1250;
nh3Input.value=62;
h2sInput.value=15;
tvocInput.value=720;
pmInput.value=125;
tempInput.value=43;
humidityInput.value=95;

updateDashboard();

};


/* -----------------------------
Reset Dashboard
----------------------------- */

document.getElementById("resetDashboard").onclick=function(){

document.getElementById("normalMode").click();

};


/* -----------------------------
Auto Demo
----------------------------- */

let autoDemo=false;

let autoTimer;

document.getElementById("autoDemo").onclick=function(){

if(!autoDemo){

autoDemo=true;

this.innerHTML="⏹ Stop Demo";

autoTimer=setInterval(()=>{

co2Input.value=Math.floor(Math.random()*1300)+300;

nh3Input.value=Math.floor(Math.random()*70);

h2sInput.value=Math.floor(Math.random()*20);

tvocInput.value=Math.floor(Math.random()*800);

pmInput.value=Math.floor(Math.random()*120);

tempInput.value=Math.floor(Math.random()*18)+24;

humidityInput.value=Math.floor(Math.random()*45)+45;

updateDashboard();

},2500);

}
else{

autoDemo=false;

clearInterval(autoTimer);

this.innerHTML="▶ Auto Demo";

}

};


/* -----------------------------
Master Dashboard
----------------------------- */

function updateDashboard(){

document.getElementById("co2Value").innerHTML=co2Input.value;

document.getElementById("nh3Value").innerHTML=nh3Input.value;

document.getElementById("h2sValue").innerHTML=h2sInput.value;

document.getElementById("tvocValue").innerHTML=tvocInput.value;

document.getElementById("pmValue").innerHTML=pmInput.value;

document.getElementById("tempValue").innerHTML=tempInput.value+"°C";

document.getElementById("humidityValue").innerHTML=humidityInput.value+"%";


document.getElementById("co2GaugeValue").innerHTML=co2Input.value+" ppm";

document.getElementById("nh3GaugeValue").innerHTML=nh3Input.value+" ppm";

document.getElementById("h2sGaugeValue").innerHTML=h2sInput.value+" ppm";


updateStatus();

updateHealth();

updateChart();

updateGauge();

updateAI();

updateSMS();

updateEmail();

updateWhatsApp();

updateAlertHistory();

}


/* -----------------------------
Page Load
----------------------------- */

window.onload=function(){

document.getElementById("normalMode").click();

};

console.log("KatrU Lite V2 Core Engine Loaded");
/*==================================================
KATRU LITE V2
SCRIPT.JS
PART 2
AI Threshold Engine
Status Engine
Health Engine
Popup Engine
==================================================*/

/*=========================================
THRESHOLD VALUES
=========================================*/

const LIMITS={

co2:{safe:800,warning:1000},

nh3:{safe:25,warning:50},

h2s:{safe:5,warning:10},

tvoc:{safe:300,warning:500},

pm:{safe:35,warning:75},

temp:{safe:35,warning:40},

humidity:{safe:75,warning:90}

};

/*=========================================
STATUS FUNCTION
=========================================*/

function getStatus(value,safe,warning){

if(value<=safe){

return "SAFE";

}

if(value<=warning){

return "WARNING";

}

return "CRITICAL";

}

/*=========================================
CARD COLOR
=========================================*/

function paintCard(card,status,label){

card.classList.remove("green");

card.classList.remove("yellow");

card.classList.remove("red");

switch(status){

case "SAFE":

card.classList.add("green");

label.innerHTML="SAFE";

break;

case "WARNING":

card.classList.add("yellow");

label.innerHTML="WARNING";

break;

case "CRITICAL":

card.classList.add("red");

label.innerHTML="CRITICAL";

break;

}

}

/*=========================================
UPDATE STATUS
=========================================*/

function updateStatus(){

paintCard(

co2Card,

getStatus(Number(co2Input.value),LIMITS.co2.safe,LIMITS.co2.warning),

co2Status

);

paintCard(

nh3Card,

getStatus(Number(nh3Input.value),LIMITS.nh3.safe,LIMITS.nh3.warning),

nh3Status

);

paintCard(

h2sCard,

getStatus(Number(h2sInput.value),LIMITS.h2s.safe,LIMITS.h2s.warning),

h2sStatus

);

paintCard(

tvocCard,

getStatus(Number(tvocInput.value),LIMITS.tvoc.safe,LIMITS.tvoc.warning),

tvocStatus

);

paintCard(

pmCard,

getStatus(Number(pmInput.value),LIMITS.pm.safe,LIMITS.pm.warning),

pmStatus

);

paintCard(

tempCard,

getStatus(Number(tempInput.value),LIMITS.temp.safe,LIMITS.temp.warning),

tempStatus

);

paintCard(

humidityCard,

getStatus(Number(humidityInput.value),LIMITS.humidity.safe,LIMITS.humidity.warning),

humidityStatus

);

}

/*=========================================
HEALTH SCORE
=========================================*/

function updateHealth(){

let health=100;

document.querySelectorAll(".sensor-card span").forEach(item=>{

if(item.innerHTML==="WARNING"){

health-=8;

}

if(item.innerHTML==="CRITICAL"){

health-=18;

}

});

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

let status="SAFE";

let alerts=0;

let recommendation="Environment is healthy. Continue monitoring.";

let prediction="Stable";

document.querySelectorAll(".sensor-card span").forEach(item=>{

if(item.innerHTML==="WARNING"){

status="WARNING";

alerts++;

}

if(item.innerHTML==="CRITICAL"){

status="CRITICAL";

alerts++;

}

});

if(status==="WARNING"){

recommendation="Increase ventilation. Inspect surrounding area.";

prediction="Moderate environmental risk.";

}

if(status==="CRITICAL"){

recommendation="Immediate action required. Restrict public access and notify maintenance.";

prediction="Hazardous condition detected.";

showCriticalPopup();

}

overallStatus.innerHTML=status;

predictionValue.innerHTML=status;

summaryStatus.innerHTML=status;

summaryPrediction.innerHTML=prediction;

recommendationText.innerHTML=recommendation;

summaryAlert.innerHTML=alerts;

document.getElementById("alerts").innerHTML=alerts;

}

/*=========================================
POPUP
=========================================*/

function showCriticalPopup(){

popupStatus.innerHTML="CRITICAL";

popupFacility.innerHTML=facilityName.value;

popupCO2.innerHTML=co2Input.value;

popupNH3.innerHTML=nh3Input.value;

popupH2S.innerHTML=h2sInput.value;

popupRecommendation.innerHTML=recommendationText.innerHTML;

alertPopup.style.display="flex";

}

/*=========================================
CLOSE POPUP
=========================================*/

closePopup.onclick=function(){

alertPopup.style.display="none";

};

/*=========================================
OPEN POPUPS
=========================================*/

previewSMS.onclick=function(){

alert(smsMessage.value);

};

previewEmail.onclick=function(){

alert(emailMessage.value);

};

previewWhatsApp.onclick=function(){

alert(whatsappMessage.value);

};

/*=========================================
ACTION BUTTONS
=========================================*/

popupSMS.onclick=function(){

alert(smsMessage.value);

};

popupEmail.onclick=function(){

alert(emailMessage.value);

};

popupWhatsApp.onclick=function(){

window.open(

"https://wa.me/?text="+

encodeURIComponent(

whatsappMessage.value

)

);

};

console.log("AI Threshold Engine Loaded");
/*==================================================
KATRU LITE V2
SCRIPT.JS
PART 3
Charts
Gauges
Notifications
==================================================*/

/*=========================================
JUST GAGE
=========================================*/

const gCO2=new JustGage({
id:"co2Gauge",
value:520,
min:0,
max:2000,
title:"",
label:"ppm",
levelColors:["#00C853","#FF9800","#E53935"]
});

const gNH3=new JustGage({
id:"nh3Gauge",
value:12,
min:0,
max:100,
title:"",
label:"ppm",
levelColors:["#00C853","#FF9800","#E53935"]
});

const gH2S=new JustGage({
id:"h2sGauge",
value:2,
min:0,
max:20,
title:"",
label:"ppm",
levelColors:["#00C853","#FF9800","#E53935"]
});

const gHealth=new JustGage({
id:"healthGauge",
value:96,
min:0,
max:100,
title:"",
label:"%",
levelColors:["#E53935","#FF9800","#00C853"]
});

/*=========================================
UPDATE GAUGE
=========================================*/

function updateGauge(){

gCO2.refresh(Number(co2Input.value));

gNH3.refresh(Number(nh3Input.value));

gH2S.refresh(Number(h2sInput.value));

gHealth.refresh(parseInt(healthScore.innerHTML));

}

/*=========================================
CHART
=========================================*/

const trendCTX=document
.getElementById("trendChart")
.getContext("2d");

const trendChart=new Chart(trendCTX,{

type:"line",

data:{

labels:[],

datasets:[

{

label:"CO₂",

data:[],

borderColor:"#00C853",

backgroundColor:"rgba(0,200,83,.10)",

fill:true,

borderWidth:3,

tension:.4

},

{

label:"NH₃",

data:[],

borderColor:"#FF9800",

backgroundColor:"rgba(255,152,0,.10)",

fill:true,

borderWidth:3,

tension:.4

},

{

label:"H₂S",

data:[],

borderColor:"#E53935",

backgroundColor:"rgba(229,57,53,.10)",

fill:true,

borderWidth:3,

tension:.4

}

]

},

options:{

responsive:true,

maintainAspectRatio:false,

interaction:{

mode:"index",

intersect:false

},

plugins:{

legend:{

position:"top"

}

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

const time=new Date().toLocaleTimeString();

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

clearChart.onclick=function(){

trendChart.data.labels=[];

trendChart.data.datasets.forEach(ds=>ds.data=[]);

trendChart.update();

};

/*=========================================
DOWNLOAD CHART
=========================================*/

downloadChart.onclick=function(){

const link=document.createElement("a");

link.download="TrendChart.png";

link.href=trendChart.toBase64Image();

link.click();

};

/*=========================================
SMS
=========================================*/

function updateSMS(){

smsMessage.value=

`🚨 KatrU Lite Alert

Facility : ${facilityName.value}

Status : ${overallStatus.innerHTML}

CO₂ : ${co2Input.value} ppm

NH₃ : ${nh3Input.value} ppm

H₂S : ${h2sInput.value} ppm

Health Score : ${healthScore.innerHTML}

AI Recommendation

${recommendationText.innerHTML}

Generated :

${new Date().toLocaleString()}`;

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

Health Score : ${healthScore.innerHTML}

Recommendation

${recommendationText.innerHTML}

Generated Automatically

KatrU Lite AI Platform`;

}

/*=========================================
WHATSAPP
=========================================*/

function updateWhatsApp(){

whatsappMessage.value=

`🚨 KatrU Lite Alert

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

if(overallStatus.innerHTML==="SAFE"){

return;

}

const row=document.createElement("tr");

row.innerHTML=`

<td>${new Date().toLocaleTimeString()}</td>

<td>${facilityName.value}</td>

<td>Environmental</td>

<td>${overallStatus.innerHTML}</td>

<td>

<span class="${
overallStatus.innerHTML==="CRITICAL"
?"red-tag":"yellow-tag"
}">

${overallStatus.innerHTML}

</span>

</td>

<td>

${recommendationText.innerHTML}

</td>

`;

if(alertHistory.children[0].innerText==="No Alerts Generated"){

alertHistory.innerHTML="";

}

alertHistory.prepend(row);

if(alertHistory.rows.length>25){

alertHistory.deleteRow(25);

}

}

console.log("Chart + Gauge + Notification Engine Loaded");
/*==================================================
KATRU LITE V2
SCRIPT.JS
PART 4
Reports
Notifications
Utilities
==================================================*/

/*====================================
COPY BUTTONS
====================================*/

copySMS.onclick=function(){

navigator.clipboard.writeText(smsMessage.value);

alert("SMS copied successfully.");

}

copyEmail.onclick=function(){

navigator.clipboard.writeText(emailMessage.value);

alert("Email copied successfully.");

}

copyWhatsApp.onclick=function(){

navigator.clipboard.writeText(whatsappMessage.value);

alert("WhatsApp message copied.");

}

/*====================================
OPEN WHATSAPP
====================================*/

openWhatsApp.onclick=function(){

window.open(

"https://wa.me/?text="+

encodeURIComponent(

whatsappMessage.value

),

"_blank"

);

}

/*====================================
SEND EMAIL
====================================*/

sendEmail.onclick=function(){

window.location.href=

"mailto:?subject="+

encodeURIComponent(emailSubject.value)+

"&body="+

encodeURIComponent(emailMessage.value);

}

/*====================================
SEND SMS
====================================*/

sendSMS.onclick=function(){

alert(

"SMS Ready\n\n"+

smsMessage.value

);

}

/*====================================
PDF REPORT
====================================*/

generatePDF.onclick=function(){

const {jsPDF}=window.jspdf;

const pdf=new jsPDF();

pdf.setFontSize(22);

pdf.text("KatrU Lite Incident Report",20,20);

pdf.setFontSize(13);

pdf.text("Facility : "+facilityName.value,20,45);

pdf.text("Status : "+overallStatus.innerHTML,20,55);

pdf.text("Health Score : "+healthScore.innerHTML,20,65);

pdf.text("CO₂ : "+co2Input.value+" ppm",20,85);

pdf.text("NH₃ : "+nh3Input.value+" ppm",20,95);

pdf.text("H₂S : "+h2sInput.value+" ppm",20,105);

pdf.text("TVOC : "+tvocInput.value+" ppb",20,115);

pdf.text("PM2.5 : "+pmInput.value+" ug/m3",20,125);

pdf.text("Temperature : "+tempInput.value+" °C",20,135);

pdf.text("Humidity : "+humidityInput.value+" %",20,145);

pdf.text("Recommendation",20,170);

pdf.text(recommendationText.innerHTML,20,180);

pdf.save("KatruLite_Incident_Report.pdf");

}

/*====================================
CSV EXPORT
====================================*/

generateCSV.onclick=function(){

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

}

/*====================================
SCREENSHOT
====================================*/

downloadDashboard.onclick=function(){

html2canvas(document.body).then(canvas=>{

const a=document.createElement("a");

a.href=canvas.toDataURL();

a.download="KatruLiteDashboard.png";

a.click();

});

}

/*====================================
FULL SCREEN
====================================*/

fullScreen.onclick=function(){

if(!document.fullscreenElement){

document.documentElement.requestFullscreen();

}

else{

document.exitFullscreen();

}

}

/*====================================
PRESENTATION MODE
====================================*/

presentationMode.onclick=function(){

document.documentElement.requestFullscreen();

document.body.classList.add("presentation");

}

/*====================================
BROWSER NOTIFICATION
====================================*/

if(Notification.permission!=="granted"){

Notification.requestPermission();

}

function browserAlert(){

if(overallStatus.innerHTML==="CRITICAL"){

new Notification(

"KatrU Lite Critical Alert",

{

body:

facilityName.value+

" requires immediate attention.",

icon:"assets/logo.png"

}

);

}

}

/*====================================
ALARM SOUND
====================================*/

const siren=new Audio(

"assets/alarm.mp3"

);

function playAlarm(){

if(overallStatus.innerHTML==="CRITICAL"){

siren.play();

}

}

/*====================================
LOCAL STORAGE
====================================*/

function saveState(){

const data={

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

"katruLite",

JSON.stringify(data)

);

}

function loadState(){

const data=

JSON.parse(

localStorage.getItem(

"katruLite"

)

);

if(!data)return;

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

window.addEventListener(

"beforeunload",

saveState

);

window.addEventListener(

"load",

loadState

);

/*====================================
AUTO INCIDENT
====================================*/

function afterDashboardUpdate(){

browserAlert();

playAlarm();

}

const oldUpdateDashboard=updateDashboard;

updateDashboard=function(){

oldUpdateDashboard();

afterDashboardUpdate();

}

/*====================================
READY
====================================*/

console.clear();

console.log(

"%cKatrU Lite Dashboard Ready",

"font-size:22px;font-weight:bold;color:#1565C0"

);
