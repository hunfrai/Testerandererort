//Variablen fetslegen und importe
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')

//Port variable angeben -> Port festlegen
const httpPort = 80
const httpsPort = 443

//Wo sind der Schlüssel und das Zertifikat zu finden
const key = fs.readFileSync('./certs/localhost.key');
const cert = fs.readFileSync('./certs/localhost.crt');

const app = express()

//Erstellen des Servers (mit Key und Zertifikat)
const server = https.createServer({key: key, cert: cert }, app);

app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
})

//Angeben wo der Public-Ordner liegt
app.use(express.static(path.join(__dirname, 'public')))

//Was passiert wenn im Browser die Route "/" aufgerufen wird
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


//Ausgeben auf welchen HTTP-Port der Serve hört
app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
  })
  
  //Ausgeben auf welchen HTTPS-Port der Serve hört
  server.listen(httpsPort, function () {
    console.log(`Listening on port ${httpsPort}!`)
  })