/*
In diesem Abschnitt wird nur das beschrieben,
was mit der Tabelle selbst zu tun hat
*/

function erstelleTabelle() {
    var tableBody = document.getElementById('tableBody');
    // Lege weitere Zeilen an (so viele wie zyklen + erste Zeile)
    for (var i = 0; i <= localStorage.getItem('zyklen'); i++){
        var row = document.createElement('tr');
        
        // Hier so viele Zellen definieren, wie es Spalten gibt,
        // sonst bleiben jeweilige Zellen leer

        // Definiere, was in der Spalte "Zyklus" passiert
        var cell1 = document.createElement('td');
        cell1.textContent = 'Jahr ' + (i);
        row.appendChild(cell1);

        // Nur relevant für die erste Zeile
        if (i == 0){
            // Erste Zelle für eier
            var cell2 = document.createElement('td');
            cell2.textContent = localStorage.getItem('eier0'); // provisorisch
            row.appendChild(cell2);

            // Erste Zelle für raupen
            var cell3 = document.createElement('td');
            cell3.textContent = localStorage.getItem('raupen0'); // provisorisch
            row.appendChild(cell3);

            // Erste Zelle für schmetterlinge
            var cell4 = document.createElement('td');
            cell4.textContent = localStorage.getItem('schmetterlinge0'); // provisorisch
            row.appendChild(cell4);

            // Erste Zeile für Unwetter
            var cell5 = document.createElement('td');
            cell5.textContent = localStorage.getItem('ereignis0');
            row.appendChild(cell5);
        }
        // Alle nächsten Zeilen
        else {
            // Definiere, was in der Spalte "Eier" passiert
            var cell2 = document.createElement('td');
            cell2.textContent = localStorage.getItem('eier' + i);
            row.appendChild(cell2);

            // Definiere, was in der Spalte "Raupen" passiert
            var cell3 = document.createElement('td');
            cell3.textContent = localStorage.getItem('raupen' + i);
            row.appendChild(cell3);

            // Definiere, was in der Spalte "Schmetterlinge" passiert
            var cell4 = document.createElement('td');
            cell4.textContent = localStorage.getItem('schmetterlinge' + i);
            row.appendChild(cell4);

            // Definiere, was in der Spalte "Unwetter" passiert
            var cell5 = document.createElement('td');
            cell5.textContent = localStorage.getItem('ereignis' + i);
            row.appendChild(cell5);
        }
        tableBody.appendChild(row);
    } 
}

function delteTabelle(){
    const table = document.getElementById('tableBody');
    while (table.firstChild) {
        table.removeChild(table.lastChild);
    }
}