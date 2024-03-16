// Skript für das PDF
document.getElementById('pdf').addEventListener('click', () => {
    // Object für das PDF
    const pdf = new jsPDF();
    //Variablen für das Dokument
    var jahre = localStorage.getItem("zyklen");
    var x0 = 10;
    var x1 = 30;
    var x2 = 70;
    var x3 = 110;
    var x4 = 150;
    var x5 = 200;
    var y = 10;
    //
    var start = 15;
    var extra_seiten = 0;

    var seitenx = 90;
    var seiteny = 290;
    //Überschrift
    pdf.setFontSize(30);
    pdf.text('Schmetterlingspopulation', x0, start);
    // text für die Eingaben#
    pdf.setFontSize(16);
    pdf.text('Anfangsbestand der Schmetterlinge: ', x0, start + 15);
    pdf.text('Anfangsbestand der Pflanzen: ', x0, start + 25);
    pdf.text(localStorage.getItem("schmetterlinge0"), x3, 30)
    pdf.text(localStorage.getItem("pflanzen0"), x3, 40)
    if(jahre == "50"){
        pdf.text('Die Population überlebt mindestens ' + jahre + ' Jahre.', x0, start + 35);
    }
    else{
        pdf.text('Die Population überlebt ' + localStorage.getItem("zyklen") + ' Jahre.', x0, start + 35);
    }
    //Legende schreiben
    pdf.text('Legende:', x0, start + 45);
    pdf.text('Lebensraumrückgang = LR, Ackerspritzung = AS', x0, start + 55);
    pdf.text('Starkregen im Eistadium/Raupenstadium/Schmetterlingsstadium = S.i.E./R./S.', x0, start + 65);
    pdf.text('Seite 1', seitenx, seiteny);
    pdf.setFontSize(20);
    pdf.text('Tabelle:', x0, 95);
    pdf.setFontSize(16);
    //Tabelle
    pdf.setLineWidth(1.0);
    // linie oben
    pdf.line(x0, 100, x5, 100);
    //linie unten
    pdf.line(x0, 110, x5, 110);
    //line links
    pdf.line(x0, 100, x0, 110);
    //linie rechts
    pdf.line(x5, 100, x5, 110);
    // linien mitte
    pdf.line(30, 100, 30, 110);
    pdf.line(70, 100, 70, 110);
    pdf.line(x3, 100, x3, 110);
    pdf.line(150, 100, 150, 110);
    //einfügen der Beschreibungen
    pdf.text('Jahre', x0 + 1, 108);
    pdf.text('Eier', x1 + 1, 108);
    pdf.text('Raupen', x2 + 1, 108);
    pdf.text('Schmetterlinge', x3 + 1, 108);
    pdf.text('Umweltereignis', x4 + 1, 108);
    pdf.setLineWidth(0.5);
    umbenennen();
    var y = 26;
    for (var i = 0; i <= localStorage.getItem('zyklen'); i++) {
        if(i == 0){
            if(localStorage.getItem('zyklen') * 1 < 17){
                pdf.line(10, 110, 10, 120 + localStorage.getItem('zyklen')*10);
                pdf.line(200, 110, 200, 120 + localStorage.getItem('zyklen')*10);
                // 4 mittlere Linien
                pdf.line(x1, 110, x1, 120 + localStorage.getItem('zyklen')*10);
                pdf.line(x2, 110, x2, 120 + localStorage.getItem('zyklen')*10);
                pdf.line(x3, 110, x3, 120 + localStorage.getItem('zyklen')*10);
                pdf.line(x4, 110, x4, 120 + localStorage.getItem('zyklen')*10);
            }
            else{
                pdf.line(10, 110, 10, 280);
                pdf.line(200, 110, 200, 280);
                // 4 mittlere Linien
                pdf.line(x1, 110, x1, 280);
                pdf.line(x2, 110, x2, 280);
                pdf.line(x3, 110, x3, 280);
                pdf.line(x4, 110, x4, 280);
            }
            pdf.line(10, 120 + i*10, 200, 120 +i*10);
            // Wert Jahre
            pdf.text("" + i, 18, 118 + i*10);
            //Wert Eier
            pdf.text(localStorage.getItem('eier' + i), 31, 118 + i*10);
            // Wert Raupen
            pdf.text(localStorage.getItem('raupen' + i), 71, 118 + i*10);
            // Wert Schmetterlinge
            pdf.text(localStorage.getItem('schmetterlinge' + i), 111, 118 + i*10);
            // Wert Umweltereignis
            pdf.text(localStorage.getItem('ereignis' + i), 151, 118 + i*10);
        }
        else if(i < 17){

            pdf.line(x0, 120 + i*10, x5, 120 +i*10);
            // Wert Jahre
            pdf.text("" + i, x0+8, 118 + i*10);
            //Wert Eier
            pdf.text(localStorage.getItem('eier' + i), 31, 118 + i*10);
            // Wert Raupen
            pdf.text(localStorage.getItem('raupen' + i), 71, 118 + i*10);
            // Wert Schmetterlinge
            pdf.text(localStorage.getItem('schmetterlinge' + i), 111, 118 + i*10);
            // Wert Umweltereignis
            pdf.text(localStorage.getItem('ereignis' + i), 151, 118 + i*10);
           
        }
        else{
            if (y == 26){
                y = 0;
                pdf.addPage();
                extra_seiten++;
                pdf.setLineWidth(1.0);
                // linie oben
                pdf.line(x0, 10, x5, 10);
                //linie unten
                pdf.line(x0, 20, x5, 20);
                //line links
                pdf.line(x0, 10, x0, 20);
                //linie rechts
                pdf.line(x5, 10, x5, 20);

                pdf.line(x1, 10, x1, 20);
                pdf.line(x2, 10, x2, 20);
                pdf.line(x3, 10, x3, 20);
                pdf.line(x4, 10, x4, 20);

                //einfügen der Beschreibungen
                pdf.text('Jahre', x0 + 1, 18);
                pdf.text('Eier', x1 + 1, 18);
                pdf.text('Raupen', x2 + 1, 18);
                pdf.text('Schmetterlinge', x3 + 1, 18);
                pdf.text('Umweltereignis', x4 + 1, 18);

                pdf.text('Seite ' + (extra_seiten+1), seitenx, seiteny);

                pdf.setLineWidth(0.5);
                
                if(localStorage.getItem('zyklen') * 1 < 16 + 26 * extra_seiten){
                    pdf.line(10, 20, 10, 20 + (localStorage.getItem('zyklen')*1 - 16 - 26 * (extra_seiten - 1))*10);
                    pdf.line(200, 20, 200, 20 + (localStorage.getItem('zyklen')*1 - 16 - 26 * (extra_seiten - 1))*10);
                    // 4 mittlere Linien
                    pdf.line(x1, 20, x1, 20 + (localStorage.getItem('zyklen')*1 - 16 - 26 * (extra_seiten - 1)) *10);
                    pdf.line(x2, 20, x2, 20 + (localStorage.getItem('zyklen')*1 - 16 - 26 * (extra_seiten - 1)) *10);
                    pdf.line(x3, 20, x3, 20 + (localStorage.getItem('zyklen')*1 - 16 - 26 * (extra_seiten - 1)) *10);
                    pdf.line(x4, 20, x4, 20 + (localStorage.getItem('zyklen')*1 - 16 - 26 * (extra_seiten - 1)) *10);
                }
                else{
                    pdf.line(10, 20, 10, 280);
                    pdf.line(200, 20, 200, 280);
                    // 4 mittlere Linien
                    pdf.line(30, 20, 30, 280);
                    pdf.line(70, 20, 70, 280);
                    pdf.line(110, 20, 110, 280);
                    pdf.line(150, 20, 150, 280);
                }
            }
            pdf.line(x0, 30 + y*10, x5, 30 +y*10);
            // Wert für Jahre
            pdf.text("" + i, x0+8, 28 + y*10);
            //Wert Eier
            pdf.text(localStorage.getItem('eier' + i), 31, 28 + y*10);
            // Wert Raupen
            pdf.text(localStorage.getItem('raupen' + i), 71, 28 + y*10);
            // Wert Schmetterlinge
            pdf.text(localStorage.getItem('schmetterlinge' + i), 111, 28 + y*10);
            // Wert Umweltereignis
            pdf.text(localStorage.getItem('ereignis' + i), 151, 28 + y*10);
            y++;
        }   
    }
  
    const blob = pdf.output('blob');

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download ='PDF-Schmetterlings_Population.pdf';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
   
});

function umbenennen(){
    var zyklen = parseInt(localStorage.getItem("zyklen"));
    for(var i = 0; i <= zyklen; i++){
        if(localStorage.getItem('ereignis' + i) == 'Lebensraumrückgang'){
            localStorage.setItem('ereignis' + i, 'LR');
        }
        else if(localStorage.getItem('ereignis' + i) == 'Ackerspritzung'){
            localStorage.setItem('ereignis' + i, 'AS');
        }
        else if(localStorage.getItem('ereignis' + i) == 'Starkregen im Eistadium'){
            localStorage.setItem('ereignis' + i, 'S.i.E.');
        }
        else if(localStorage.getItem('ereignis' + i) == 'Starkregen im Raupenstadium'){
            localStorage.setItem('ereignis' + i, 'S.i.R');
        }
        else if(localStorage.getItem('ereignis' + i) == 'Starkregen im Schmetterlingstadium'){
            localStorage.setItem('ereignis' + i, 'S.i.S.');
        }
    }
}
// CSV-Download
const tableToCSV = table => {
    const headers = Array.from(table.querySelectorAll('th'))
    .map(item => item.innerText).join(',')

const rows = Array.from(table.querySelectorAll('tr'))
    .reduce((arr, domRow) => {
        if (domRow.querySelector('th')) return arr

    const cells = Array.from(domRow.querySelectorAll('td'))
        .map(item => item.innerText)
        .join(',')

        return arr.concat([cells])
    }, [])

    return headers + '\n' + rows.join('\n')
};

const downloadCSV = csv => {
const csvFile = new Blob([csv], { type: 'text/csv' })
const downloadLink =  document.createElement('a')

downloadLink.download = `CSV-Schmetterlings_Population.csv`
downloadLink.href = URL.createObjectURL(csvFile)
downloadLink.style.display = 'none'
document.body.appendChild(downloadLink)
downloadLink.click()
document.body.removeChild(downloadLink)
};

document.getElementById('csv').addEventListener('click', () => {
    const table = document.querySelector('table')
    const csv = tableToCSV(table)  
    return downloadCSV(csv)
});