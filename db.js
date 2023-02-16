const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  database: 'm6_L1_ejercicio2',
  port: 5432,
  user: 'postgres',
  password: 'nelson',
})

client.connect((err) => {
  if (err) {
    //console.error('connection error', err.stack)
    console.error('connection error', err.message)
  } else {
    console.log('connected')
  }
})

const traerConductores = () =>{
  //Esto tiene un Callback
  client.query("SELECT * FROM conductores;", (err, result) => {
    if(err){
      return "Ha ocurrido un error."
    }
    //console.log(result) //La propiedad rows tiene los valores
    console.table(result.rows)
    client.end();
  })
}

//LLAMADA DIRECTA DE ESTE ARCHIVO
//traerconductores();

//EXPORTAR CON ECMAScript5
module.exports = {
  traerConductores
}