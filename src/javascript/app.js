//Funktion um zwischen Tabelle und Grafik zu wechseln
function switchGT(button_id){
    console.log("funktion startet");
    var el = document.getElementById(button_id);
    if (el.firstChild.data == "Ändere Grafik zu Tabelle"){
        el.firstChild.data = "Ändere Tabelle zu Grafik";
        var canvas = document.getElementById('chart');
        canvas.style.display = "none";
        var tabelle = document.getElementById('tabelleCanvas');
        tabelle.style.display = "block";
      
    }
    else{
        el.firstChild.data = "Ändere Grafik zu Tabelle";
        var canvas = document.getElementById('chart');
        canvas.style.display = "block";
        var tabelle = document.getElementById('tabelleCanvas');
        tabelle.style.display = "none";
    }

}
// Funktion um eine Variable zu bestätigen und speichern nicht mehr verwendet
function confirmOption(optionId){
            
    switch(optionId){
        case 'option1':
            var scalingInput = document.getElementById("scale1");  
            localStorage.setItem(optionId, scalingInput.value);
            console.log('Eingegebener Skalierungswert für Anfangsbestand:', scalingInput.value);
            console.log(localStorage.getItem(optionId));
            break;
        case 'option2':
            var scalingInput = document.getElementById("scale2");  
            localStorage.setItem(optionId, scalingInput.value);
            console.log('Eingegebener Skalierungswert für Geburtenrate:', scalingInput.value);
            console.log(localStorage.getItem(optionId));
            break;
        
        default:
            console.log("Falsche id");
    }
}
// Funktion um alle Variablen zu bestätigen und speichern
function confirmAll(){
    var scalingInput = document.getElementById("scale1");  
    localStorage.setItem("schmetterlinge0", scalingInput.value);
    console.log('Eingegebener Skalierungswert für Anfangsbestand:', scalingInput.value);
    console.log(localStorage.getItem("schmetterlinge0"));

    var scalingInput = document.getElementById("scale2");  
    localStorage.setItem("pflanzen0", scalingInput.value);      
    console.log('Eingegebener Skalierungswert für Geburtenrate:', scalingInput.value);
    console.log(localStorage.getItem("pflanzen0"));

    umweltereignis = document.getElementById("scale3").value;
    console.log("Umweltereignis: " + umweltereignis);
    
    // aktualisiert Textfeld
    
    if(umweltereignis == 0){
        document.getElementById('eingaben-text').innerHTML =  '<span class="headline">Aktuelle Eingaben</span><br><br>Anfangsbestand: ' +   localStorage.getItem('schmetterlinge0') + '  Pflanzenbestand: ' + localStorage.getItem('pflanzen0') + '<br> Umweltereignis: Off'
    }
    else if (umweltereignis == 1){
        document.getElementById('eingaben-text').innerHTML =  '<span class="headline">Aktuelle Eingaben</span><br><br>Anfangsbestand: ' +   localStorage.getItem('schmetterlinge0') + '  Pflanzenbestand: ' + localStorage.getItem('pflanzen0') + '<br> Ein Umweltereignis passiert jedes Jahr!'
    }
    else{
        document.getElementById('eingaben-text').innerHTML =  '<span class="headline">Aktuelle Eingaben</span><br><br>Anfangsbestand: ' +   localStorage.getItem('schmetterlinge0') + '  Pflanzenbestand: ' + localStorage.getItem('pflanzen0') + '<br> Ein Umweltereignis passiert ca. alle ' + umweltereignis + ' Jahre!'
    }
    
    

}
// Funktionen um Button zu färben wenn ausgewählt #4CAF50

function setColorBack(bid){
    document.getElementById(bid).style.background = "#87a891";
}

function setColorLight(buttonid){
    console.log("check funktion setColorLight " + buttonid);
    document.getElementById(buttonid).style.background = "#A5FD78";
}


// Skript für die Slider
const slider1 = document.getElementById("scale1");
slider1.addEventListener("input", function() {
    document.getElementById('outputSchmetterlinge').textContent = slider1.value;
    
});
const slider2 = document.getElementById("scale2");
slider2.addEventListener("input", function() {
    
    document.getElementById('outputPflanzen').textContent = slider2.value;
    
});
const slider3 = document.getElementById("scale3");
slider3.addEventListener("input", function() {
    if(slider3.value == 0){
        document.getElementById('outputUnwetter').textContent = "Off";
    }
    else{
        document.getElementById('outputUnwetter').textContent = slider3.value;
    }
    
    
});

// Funktion um den Infotext anzuzeigen
function showInfo(button_id){
    var info = document.getElementById(button_id);
    if(info.style.display == 'block'){
        info.style.display = 'none';
    }
    else {
        info.style.display = 'block';
    }
}


// Funktion um die Simulation zu starten
function simulation(){
    start();
    delteTabelle();
    erstelleTabelle();
    sendChartDataToLOL(); 
    var canvas = document.getElementById('chart');
    canvas.style.display = "none";
    var tabelle = document.getElementById('tabelleCanvas');
    tabelle.style.display = "block";
}