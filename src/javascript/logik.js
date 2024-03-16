// Skript Simulationslogik
let i = 0;
let average = 0; //nicht sicher ob das noch relevant ist
let mwWeibchen = 750;
let sdWeibchen = 90;
let Ackerspritzung = false;
let Starkregenereignis = false;
let Lebensraumverlust = false;
let Starkregencounter = 0;
let Raupen = 0;
let Eier = 0;
let Kapa = 0;
let MerkPflanz = 0;
let MerkSchmetterlinge = 0;
let Schmetterlinge = MerkSchmetterlinge;
let Pflanzen = MerkPflanz;
let counter = 0;
let periodencounter = 0;

// Variable für Starkwetterereignis
let umweltereignis = 7;
let ereignis = "Test1" // nimmt Wert des Ereignisses an für die Tabelle

const gaussianRand = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

function zufallSD(mittelwert, standardabweichung) {
    const zufallszahl = mittelwert + standardabweichung * gaussianRand();
    return zufallszahl;
}

function SchmetterlingeAnzahl() {
    if (Ackerspritzung === true) {
        Schmetterlinge *= 0.5;
        Ackerspritzung = false;
        ereignis = "Ackerspritzung";
        localStorage.setItem('ereignis' + periodencounter, ereignis);
        console.log("Acker wurde gespritzt.");

        //edit
        localStorage.setItem('schmetterlinge' + periodencounter, Schmetterlinge);
        console.log("Zyklus " + periodencounter + "; Schmetterlinge: " + Schmetterlinge);
        return { Schmetterlinge, Ackerspritzung, ereignis };
    }
    if (Starkregenereignis === true && Starkregencounter === 1) {
        Schmetterlinge *= 0.2;
        Starkregenereignis = false;
        Starkregencounter = 0;
        ereignis = "Starkregen im Schmetterlingstadium";
        localStorage.setItem('ereignis' + periodencounter, ereignis);
        console.log("Es gab ein Starkregenereignis im Schmetterlingstadium");

        //edit
        localStorage.setItem('schmetterlinge' + periodencounter, Schmetterlinge);
        console.log("Zyklus " + periodencounter + "; Schmetterlinge: " + Schmetterlinge);
        return { Schmetterlinge, Starkregenereignis, Starkregencounter, ereignis };
    }
}

function FlächePflanzen() {
    if (Lebensraumverlust === true) {
        Pflanzen = Pflanzen * 0.7;
        Lebensraumverlust = false;
        ereignis = "Lebensraumrückgang";
        localStorage.setItem('ereignis' + periodencounter, ereignis);
        console.log("Der Lebensraum ging zurück.");
        return { Pflanzen, Lebensraumverlust, ereignis };
    }
    return Pflanzen;
}

function neuPflanzencheck() {
    const zufi = zufallSD(10,5);
    Kapa = Pflanzen * Math.ceil(zufi);

    if (Kapa < Raupen) {
        if (zufi <= 1) {
            Raupen = Math.ceil(Pflanzen);
        } else {
            Raupen = Math.floor(Kapa);
        }

        //edit
        localStorage.setItem('raupen' + periodencounter, Raupen);
        console.log("Zyklus " + periodencounter + "; Raupen: " + Raupen);
        return Raupen;
    }
}

function Ereignismaster(){
    let ereigniscounter = 0
    if (umweltereignis == 0){
        ereignis = "Keins";
        localStorage.setItem('ereignis' + periodencounter, ereignis);
    }
    else if (umweltereignis == 1) {
        Ereignisse() 
    }
    else if (umweltereignis > 1){
        //if (umweltereignis <= 5){   Ansatz für Modulu, vllt später noch machen.
       ///    zufall1 = zufallSD(umweltereignis, 1); 
            if (periodencounter % umweltereignis === 0) {
                Ereignisse();

            }
            else {
                ereigniscounter = Math.floor(Math.random() *5) + 1;
                if (ereigniscounter == 1 ){
                    Ereignisse();
                }
                else {
                    ereignis = "Keins";
                    localStorage.setItem('ereignis' + periodencounter, ereignis);
                }
                
            }
        }/*
        else if (umweltereignis >5 && umweltereignis < 10 ){
            ereignis = "ü5 u10";
            localStorage.setItem('ereignis' + periodencounter, ereignis);
        }
        else if (umweltereignis > 9){
            ereignis = "ü10";
            localStorage.setItem('ereignis' + periodencounter, ereignis);
        }   
        */
     
    return ereignis;
}

function Ereignisse() {

    counter = Math.floor(Math.random() * 3) + 1; // Je nach Chance für Eintreten eines Ereignisses die hintere Zahl erhöhen oder senken

    if (counter === 1) {
        Ackerspritzung = true;
        console.log("Es gab eine Ackerspritzung");
        return {Ackerspritzung, ereignis};
    } else if (counter === 2) {
        Starkregenereignis = true;
        Starkregencounter = Math.floor(Math.random() * 3) + 1;
        return { Starkregenereignis, Starkregencounter};
    } else if (counter === 3) {
        Lebensraumverlust = true;
        console.log("Es kam zum Lebensraumverlust");
        return {Lebensraumverlust};
    }
}

function Eierlegen() {
    Eier = Math.floor(Schmetterlinge * 0.5 * zufallSD(mwWeibchen, sdWeibchen));

    if (Starkregenereignis === true && Starkregencounter === 2) {
        Eier = Math.floor(Eier * 0.9);
        Starkregenereignis = false;
        Starkregencounter = 0;
        ereignis = "Starkregen im Eistadium";
        localStorage.setItem('ereignis' + periodencounter, ereignis);
        console.log("Es gab ein Starkregenereignis, im Eierstadium.");
    }
    //edit
    localStorage.setItem('eier' + periodencounter, Eier);
    console.log("Zyklus " + periodencounter + "; Eier: " + Eier);
    return { Eier, Starkregenereignis, ereignis };
}

function Schlüpfen() {
    Raupen = Math.floor(Eier * (Math.random() * (0.21 - 0.08) + 0.08));

    if (Starkregenereignis === true && Starkregencounter === 3) {
        Raupen = Math.ceil(Raupen * 0.7);
        Starkregenereignis = false;
        Starkregencounter = 0;
        ereignis = "Starkregen im Raupenstadium";
        localStorage.setItem('ereignis' + periodencounter, ereignis);
        console.log("Es gab ein Starkregenereignis im Raupenstadium.");
    }
    //edit
    localStorage.setItem('raupen' + periodencounter, Raupen);
    console.log("Zyklus " + periodencounter + "; Raupen: " + Raupen);
    return { Raupen, Starkregenereignis, Starkregencounter, ereignis};
}

function Entpuppen() {
    Schmetterlinge = Math.floor(Raupen * 0.1);
    //edit
    localStorage.setItem('schmetterlinge' + periodencounter, Schmetterlinge);
    console.log("Zyklus " + periodencounter + "; Schmetterlinge: " + Schmetterlinge);
    return Schmetterlinge;
}

//edit
function reset() {
    periodencounter = 0;
    counter = 0;
    ereignis = "Keins";
    average = 0; //nicht sicher ob das noch relevant ist
    localStorage.setItem('ereignis' + periodencounter, ereignis);
    Pflanzen = localStorage.getItem('pflanzen0');
    console.log( "Pflanzen: " + Pflanzen);
    Schmetterlinge = localStorage.getItem('schmetterlinge0');
    console.log( "Schmetterlinge: " + Schmetterlinge);
    console.log("ende reset Funktion");
}

function start() {
    reset(); //edit
    Eierlegen();
    Schlüpfen();
    neuPflanzencheck();
    i += 1;
    while (Schmetterlinge >= 2 && periodencounter < 50) {
        periodencounter++;
        Ereignismaster();  
        SchmetterlingeAnzahl();
        Eierlegen();
        Schlüpfen();
        FlächePflanzen();
        neuPflanzencheck();
        Entpuppen();
        counter = 0;
        i += 1;
    }

    localStorage.setItem('zyklen', periodencounter);
    console.log("Die Population überlebte " + periodencounter + " Jahre.");
    periodencounter = 0;
}