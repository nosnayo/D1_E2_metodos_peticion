const express = require('express')
const app = express()
const { traerConductores } = require('./db.js')

app.get('/', function (req, res) {
  res.send('Ejercicio 2 ')
})

//RETORNA LA LISTA DE TODOS LOS CONDUCTORES
app.get('/conductores', function (req, res) {
  let conductores = traerConductores();
  if(!conductores){
    res.send('no existen conductes en la BD.')
  }else{
    let acumulador = "<ol>"
  }
  res.send('Ruta Conductores')
})

//SIN ECMASCcript6
// app.listen(3000, function(){
//   console.log("Servidor esuchando en http://localhost:3000")
// })
//CON ECMAScript6
app.listen(3000, () =>{
  console.log("Servidor esuchando en http://localhost:3000")
})